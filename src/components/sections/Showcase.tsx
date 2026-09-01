import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import showcase1 from "@/assets/showcase-1.png.asset.json";
import showcase2 from "@/assets/showcase-2.png.asset.json";
import showcase3 from "@/assets/showcase-3.png.asset.json";
import showcase4 from "@/assets/showcase-4.png.asset.json";
import showcase5 from "@/assets/showcase-5.png.asset.json";
import showcase6 from "@/assets/showcase-6.png.asset.json";
import logoIntro from "@/assets/showcase-1-1.png.asset.json";
import nike from "@/assets/showcase-2-1.png.asset.json";
import instagram from "@/assets/showcase-3-1.png.asset.json";
import apple from "@/assets/showcase-4-1.png.asset.json";
import starbucks from "@/assets/showcase-5-1.png.asset.json";
import burgerKing from "@/assets/showcase-6-1.png.asset.json";
import followMore from "@/assets/showcase-7.png.asset.json";
import albumWarning from "@/assets/showcase-album-2.png.asset.json";
import albumLife from "@/assets/showcase-album-3.png.asset.json";
import ceramicFlyer from "@/assets/showcase-flyer-1.png.asset.json";
import hiringFlyer from "@/assets/showcase-flyer-6.png.asset.json";
import editMark from "@/assets/showcase-logo-3.jpg.asset.json";
import craftCharm from "@/assets/showcase-logo-4.png.asset.json";
import dynamicDesigns from "@/assets/showcase-logo-5.png.asset.json";
import dynamicDesignsMark from "@/assets/showcase-logo-6.png.asset.json";
import grvnthMark from "@/assets/showcase-logo-8.png.asset.json";
import adventureSmp from "@/assets/showcase-logo-10.png.asset.json";
import xsaltyxfupax from "@/assets/showcase-logo-12.png.asset.json";
import splash from "@/assets/showcase-logo-13.png.asset.json";
import trendora from "@/assets/showcase-logo-14.png.asset.json";
import vibeSpot from "@/assets/showcase-logo-15.png.asset.json";
import vintageVibes from "@/assets/showcase-logo-16.jpg.asset.json";
import clipMark from "@/assets/showcase-logo-3.jpg.asset.json";
import logo17 from "@/assets/showcase-logo-17.svg.asset.json";
import logo18 from "@/assets/showcase-logo-18.jpg.asset.json";
import logo18Gold from "@/assets/showcase-logo-18-gold.png.asset.json";
import logo19 from "@/assets/showcase-logo-19.png.asset.json";
import logo21 from "@/assets/showcase-logo-21.png.asset.json";
import logo23 from "@/assets/showcase-logo-23.png.asset.json";
import logo24 from "@/assets/showcase-logo-24.png.asset.json";
import logo25 from "@/assets/showcase-logo-25.jpg.asset.json";
import { Reveal } from "../Reveal";

type Slide = { src: string; alt: string };

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  slides: Slide[];
  frame: "portrait" | "square";
};

const projects: Project[] = [
  {
    number: "01",
    category: "Campaign design",
    title: "Immune Plus — Summer Reset",
    description: "A complete social campaign built around clarity, energy, and everyday wellness.",
    frame: "portrait",
    slides: [
      { src: showcase1.url, alt: "Immune Plus summer reset campaign cover" },
      { src: showcase2.url, alt: "Immune Plus campaign benefits graphic" },
      { src: showcase3.url, alt: "Immune Plus campaign comparison graphic" },
      { src: showcase4.url, alt: "Immune Plus campaign steps graphic" },
      { src: showcase5.url, alt: "Immune Plus campaign product benefits graphic" },
      { src: showcase6.url, alt: "Immune Plus campaign call to action graphic" },
    ],
  },
  {
    number: "02",
    category: "Brand study",
    title: "Logo Redesigns",
    description: "A visual study of how iconic brands refine their symbols for stronger recognition.",
    frame: "portrait",
    slides: [
      { src: logoIntro.url, alt: "Logo redesigns series introduction" },
      { src: nike.url, alt: "Nike logo redesign comparison" },
      { src: instagram.url, alt: "Instagram logo redesign comparison" },
      { src: apple.url, alt: "Apple logo redesign comparison" },
      { src: starbucks.url, alt: "Starbucks logo redesign comparison" },
      { src: burgerKing.url, alt: "Burger King logo redesign comparison" },
      { src: followMore.url, alt: "Logo redesigns series closing slide" },
    ],
  },
  {
    number: "03",
    category: "Logo identity",
    title: "Identity explorations",
    description: "A collection of logo directions shaped for distinct voices, from refined wordmarks to bold visual systems.",
    frame: "square",
    slides: [
      { src: craftCharm.url, alt: "Craft and Charm logo identity" },
      { src: dynamicDesigns.url, alt: "Dynamic Designs logo identity" },
      { src: dynamicDesignsMark.url, alt: "Dynamic Designs bold logo identity" },
      { src: grvnthMark.url, alt: "Grvnth logo identity" },
      { src: adventureSmp.url, alt: "Adventure SMP logo identity" },
      { src: xsaltyxfupax.url, alt: "Xsaltyxfupax gaming logo identity" },
      { src: splash.url, alt: "Splash beverage logo identity" },
      { src: trendora.url, alt: "Trendora logo identity" },
      { src: vibeSpot.url, alt: "Vibe Spot logo identity" },
      { src: vintageVibes.url, alt: "Vintage Vibes logo identity" },
      { src: clipMark.url, alt: "Video editing clip and scissors logo identity" },
      { src: logo17.url, alt: "Blue geometric logo identity" },
      { src: logo18.url, alt: "Yurane logo identity" },
      { src: logo18Gold.url, alt: "Noxx gold logo identity" },
      { src: logo19.url, alt: "Grab Gadgets logo identity" },
      { src: logo21.url, alt: "Create For Me logo identity" },
      { src: logo23.url, alt: "Make The Vibes logo identity" },
      { src: logo24.url, alt: "Leader Issues logo identity" },
      { src: logo25.url, alt: "Blue and cyan abstract logo identity" },
    ],
  },
  {
    number: "04",
    category: "Cover art",
    title: "Album cover studies",
    description: "Two cinematic cover directions exploring intensity, scale, and atmosphere for music releases.",
    frame: "square",
    slides: [
      { src: albumWarning.url, alt: "The Last Warning Signal album cover" },
      { src: albumLife.url, alt: "All My Life album cover" },
    ],
  },
  {
    number: "05",
    category: "Print & social",
    title: "Ceramic Junction",
    description: "A direct, high-contrast promotional flyer for a materials and home-finishings brand.",
    frame: "portrait",
    slides: [{ src: ceramicFlyer.url, alt: "Ceramic Junction promotional flyer" }],
  },
  {
    number: "06",
    category: "Social graphic",
    title: "Remote Opportunities",
    description: "An information-led recruitment graphic structured for quick reading on social feeds.",
    frame: "portrait",
    slides: [{ src: hiringFlyer.url, alt: "Remote opportunities recruitment graphic" }],
  },
  {
  },
];

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function ShowcaseCard({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const hasCarousel = project.slides.length > 1;
  const slide = project.slides[active];

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + project.slides.length) % project.slides.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className={`relative overflow-hidden rounded-2xl border border-border/70 bg-foreground/[0.04] ${project.frame === "square" ? "aspect-square" : "aspect-[4/5]"}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-contain transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.015]"
          />
        </AnimatePresence>

        {hasCarousel && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-border/70 bg-background/80 p-1 backdrop-blur-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Previous slide for ${project.title}`}
              onClick={() => move(-1)}
              className="h-8 w-8 rounded-full text-foreground hover:bg-foreground/10"
            >
              <Arrow direction="left" />
            </Button>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground">
              {String(active + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Next slide for ${project.title}`}
              onClick={() => move(1)}
              className="h-8 w-8 rounded-full text-foreground hover:bg-foreground/10"
            >
              <Arrow direction="right" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
            {project.number} · {project.category}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-[1.65] text-muted-foreground">{project.description}</p>
        </div>
      </div>

      {hasCarousel && (
        <div className="mt-4 flex items-center gap-1.5" aria-label={`${project.title} slides`}>
          {project.slides.map((item, index) => (
            <Button
              key={item.src}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className="h-5 w-5 rounded-full p-0 hover:bg-transparent"
            >
              <span className={`h-1.5 rounded-full transition-all duration-300 ${index === active ? "w-5 bg-foreground" : "w-1.5 bg-foreground/25"}`} />
            </Button>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export function Showcase() {
  return (
    <section id="work" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-muted-foreground">
                ⟶ Selected work
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-3xl font-display text-balance text-[2.7rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                Ideas, shaped into
                <br />
                <span className="italic font-semibold text-muted-foreground">visual language.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-[1.7] text-muted-foreground md:pb-2">
              A selection of identity studies, campaigns, cover art, and content built to be remembered.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 sm:gap-y-20">
          {projects.map((project) => (
            <ShowcaseCard key={project.number} project={project} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 flex justify-center border-t border-border/60 pt-10">
            <Button asChild size="lg" className="group rounded-full px-7 py-6 text-sm font-semibold">
              <a
                href="https://drive.google.com/drive/folders/1GrIJ8rAO8mg1UYMEUVJkP1e-0dSX9ady"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All Work
                <svg className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}