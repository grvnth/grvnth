import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function createPublicFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) new Headers(init.headers).forEach((value, name) => headers.set(name, value));
    if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

export const getPublishedPortfolio = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Portfolio content is unavailable.");
  const publicClient = createClient<Database>(url, key, {
    global: { fetch: createPublicFetch(key) },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const [{ data: sections, error: sectionError }, { data: projects, error: projectError }] = await Promise.all([
    publicClient.from("portfolio_sections").select("id,name,slug,description,cover_path,display_order,visible").eq("visible", true).order("display_order"),
    publicClient.from("portfolio_projects").select("id,section_id,title,description,media_paths,video_path,video_url,tags,client_name,project_year,featured,display_order,published").eq("published", true).order("display_order"),
  ]);
  if (sectionError || projectError) throw new Error("Portfolio content is temporarily unavailable.");
  const visibleSectionIds = new Set((sections ?? []).map((section) => section.id));
  const publicProjects = (projects ?? []).filter((project) => visibleSectionIds.has(project.section_id));
  const paths = [...new Set(publicProjects.flatMap((project) => [...project.media_paths, ...(project.video_path ? [project.video_path] : [])]).filter((path) => !path.startsWith("/") && !/^https?:\/\//i.test(path)))];
  const signed = new Map<string, string>();
  if (paths.length) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const results = await Promise.all(paths.map(async (path) => {
      const { data, error } = await supabaseAdmin.storage.from("portfolio-media").createSignedUrl(path, 60 * 60);
      return !error && data?.signedUrl ? [path, data.signedUrl] as const : null;
    }));
    results.forEach((result) => { if (result) signed.set(result[0], result[1]); });
  }
  return {
    sections: sections ?? [],
    projects: publicProjects.map((project) => ({
      ...project,
      media_paths: project.media_paths.map((path) => signed.get(path) ?? path),
      video_path: project.video_path ? signed.get(project.video_path) ?? null : null,
    })),
    expiresIn: 3600,
  };
});