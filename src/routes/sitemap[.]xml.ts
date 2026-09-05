import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { routeTree } from "@/routeTree.gen";

const BASE_URL = "https://grvnth.lovable.app";

// Routes to exclude from the sitemap (non-indexable / utility routes).
const EXCLUDE = new Set<string>(["/sitemap.xml"]);

// Per-path priority/changefreq hints. Anything not listed uses defaults.
const HINTS: Record<string, { changefreq: string; priority: string }> = {
  "/": { changefreq: "weekly", priority: "1.0" },
};
const DEFAULT_HINT = { changefreq: "monthly", priority: "0.7" };

function collectPaths(): string[] {
  const paths = new Set<string>();
  // routeTree.gen keeps every route id under fileRoutesByPath; walk the generated map.
  const byPath = routeTree as unknown as {
    _addFileTypes?: unknown;
  } as { children?: Record<string, unknown> };

  // Preferred: read the generated FileRoutesByFullPath keys.
  // We import routeTree at runtime, but its shape only exposes children; use the
  // internal `_flatRoutes` when available, otherwise fall back to a manual walk.
  const anyTree = routeTree as unknown as {
    children?: Record<string, { id?: string; fullPath?: string; children?: unknown }>;
  };
  const stack: Array<{ id?: string; fullPath?: string; children?: unknown }> = [];
  if (anyTree.children) stack.push(...Object.values(anyTree.children));
  while (stack.length) {
    const node = stack.pop()!;
    const p = node.fullPath ?? node.id;
    if (p && typeof p === "string" && !p.includes("$") && !p.includes("*")) {
      paths.add(p === "" ? "/" : p);
    }
    const kids = (node as { children?: Record<string, unknown> }).children;
    if (kids) stack.push(...(Object.values(kids) as Array<{ id?: string; fullPath?: string }>));
  }
  return [...paths].filter((p) => !EXCLUDE.has(p));
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = collectPaths().sort((a, b) =>
          a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b),
        );

        const urls = paths.map((path) => {
          const hint = HINTS[path] ?? DEFAULT_HINT;
          return [
            `  <url>`,
            `    <loc>${BASE_URL}${path}</loc>`,
            `    <changefreq>${hint.changefreq}</changefreq>`,
            `    <priority>${hint.priority}</priority>`,
            `  </url>`,
          ].join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
