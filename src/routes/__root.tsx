import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #ffffff, transparent 70%)" }}
      />
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <p className="mb-6 text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="font-display text-balance text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-8xl">
          Lost in
          <span className="italic text-muted-foreground"> space.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-balance text-sm leading-[1.7] text-muted-foreground">
          The page you're looking for doesn't exist or has drifted off. Let's
          get you back to something useful.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="https://drive.google.com/drive/folders/1GrIJ8rAO8mg1UYMEUVJkP1e-0dSX9ady"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background sm:w-auto"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">View My Designs</span>
            <svg className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/#contact"
            className="glass-strong group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold text-foreground sm:w-auto"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Contact Me</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Granth Agrawal | Freelance Graphic Designer & Video Editor" },
      { name: "description", content: "Creating premium graphic design, motion graphics, and video editing that help brands, creators, and startups grow through impactful visual storytelling." },
      { name: "author", content: "Granth Agrawal" },
      { property: "og:site_name", content: "Granth Agrawal" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "9-4NGQDm9bbCcKCNAOEQkkV6gMKvsTbX_D9wSoKJL2g" },
      { property: "og:title", content: "Granth Agrawal | Freelance Graphic Designer & Video Editor" },
      { name: "twitter:title", content: "Granth Agrawal | Freelance Graphic Designer & Video Editor" },
      { property: "og:description", content: "Creating premium graphic design, motion graphics, and video editing that help brands, creators, and startups grow through impactful visual storytelling." },
      { name: "twitter:description", content: "Creating premium graphic design, motion graphics, and video editing that help brands, creators, and startups grow through impactful visual storytelling." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/vrMdmViP0jhReeJiiJCcidFjdEq1/social-images/social-1785040574512-1000783763.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/vrMdmViP0jhReeJiiJCcidFjdEq1/social-images/social-1785040574512-1000783763.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
