import { Reveal } from "../Reveal";

export function About() {
  return (
    <section id="about" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            ⟶ About
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Visuals with intent.
            <br />
            <span className="italic text-muted-foreground">Stories that linger.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Passionate about transforming ideas into visuals and videos that capture
              attention, tell stories, and leave a lasting impression.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="space-y-6">
              <p className="leading-relaxed text-muted-foreground">
                As a Graphic Designer and Video Editor, I create engaging content that blends
                creativity, strategy, and storytelling to help brands, businesses, and creators
                stand out.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                From social media creatives and branding to promotional videos and digital
                content, I focus on delivering impactful, modern, and memorable visual
                experiences.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
