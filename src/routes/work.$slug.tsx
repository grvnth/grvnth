import { createFileRoute, notFound } from "@tanstack/react-router";
import { MediaImage } from "@/components/MediaImage";
import { Button } from "@/components/ui/button";
import { getPublishedPortfolio } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const portfolio = await getPublishedPortfolio();
    const section = portfolio.sections.find((item) => item.slug === params.slug);
    if (!section) throw notFound();
    return {
      section,
      projects: portfolio.projects.filter((item) => item.section_id === section.id),
    };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.section.name ?? "Selected work";
    const description = loaderData?.section.description || `Explore selected ${name.toLowerCase()} by Granth Agrawal.`;
    const title = `${name} — Granth Agrawal`;
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ] };
  },
  notFoundComponent: WorkNotFound,
  errorComponent: WorkError,
  component: WorkSectionPage,
});

function WorkNotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-background px-5 text-center text-foreground"><div><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Selected work</p><h1 className="mt-4 font-display text-4xl font-bold">This collection isn’t available.</h1><Button asChild className="mt-7 rounded-full"><a href="/#work">Back to the portfolio</a></Button></div></main>;
}

function WorkError(_props: { error: unknown; reset: () => void }) {
  return <main className="flex min-h-screen items-center justify-center bg-background px-5 text-center text-foreground"><div><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Selected work</p><h1 className="mt-4 font-display text-4xl font-bold">This collection didn’t load.</h1><Button asChild className="mt-7 rounded-full"><a href="/">Back to the portfolio</a></Button></div></main>;
}

function WorkSectionPage() {
  const { section, projects } = Route.useLoaderData();
  return <main className="min-h-screen bg-background px-5 pb-24 pt-28 text-foreground sm:pt-36">
    <div className="mx-auto max-w-6xl">
      <a href="/#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">← All work</a>
      <header className="mt-10 max-w-3xl border-b border-border/60 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Portfolio collection</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-7xl">{section.name}</h1>
        {section.description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{section.description}</p>}
      </header>
      {projects.length ? <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {projects.map((project) => <article key={project.id} className="min-w-0">
          {project.media_paths[0] && <div className="overflow-hidden rounded-2xl border border-border/70 bg-foreground/[0.04]">
            { /\.(mp4|mov|webm|m4v)(?:[?#]|$)/i.test(project.media_paths[0])
              ? <video src={project.media_paths[0]} controls playsInline preload="metadata" className="aspect-[4/5] w-full object-contain" aria-label={`${project.title} video`} />
              : <MediaImage src={project.media_paths[0]} alt={`${project.title} portfolio image`} loading="lazy" className="aspect-[4/5] w-full object-contain" />}
          </div>}
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.project_year ?? "Selected work"}{project.client_name ? ` · ${project.client_name}` : ""}</p>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{project.title}</h2>
          {project.description && <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{project.description}</p>}
          {project.tags.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <li key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tag}</li>)}</ul>}
        </article>)}
      </div> : <p className="py-20 text-sm text-muted-foreground">No published projects in this collection yet.</p>}
    </div>
  </main>;
}