import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import showcase1 from "@/assets/showcase-1.png";
import showcase2 from "@/assets/showcase-2.png";
import showcase3 from "@/assets/showcase-3.png";
import showcase4 from "@/assets/showcase-4.png";
import showcase5 from "@/assets/showcase-5.png";
import showcase6 from "@/assets/showcase-6.png";
import logoIntro from "@/assets/showcase-1-1.png";
import nike from "@/assets/showcase-2-1.png";
import instagram from "@/assets/showcase-3-1.png";
import apple from "@/assets/showcase-4-1.png";
import starbucks from "@/assets/showcase-5-1.png";
import burgerKing from "@/assets/showcase-6-1.png";
import followMore from "@/assets/showcase-7.png";
import albumWarning from "@/assets/showcase-album-2.png";
import albumLife from "@/assets/showcase-album-3.png";
import ceramicFlyer from "@/assets/showcase-flyer-1.png";
import hiringFlyer from "@/assets/showcase-flyer-6.webp";
import poster13 from "@/assets/showcase-poster-13.webp";
import poster14 from "@/assets/showcase-poster-14.png";
import poster15 from "@/assets/showcase-poster-15.png";
import poster17 from "@/assets/showcase-poster-17.webp";
import poster18 from "@/assets/showcase-poster-18.webp";
import editMark from "@/assets/showcase-logo-3.jpg";
import craftCharm from "@/assets/showcase-logo-4.png";
import dynamicDesigns from "@/assets/showcase-logo-5.png";
import dynamicDesignsMark from "@/assets/showcase-logo-6.png";
import grvnthMark from "@/assets/showcase-logo-8.png";
import adventureSmp from "@/assets/showcase-logo-10.png";
import xsaltyxfupax from "@/assets/showcase-logo-12.png";
import splash from "@/assets/showcase-logo-13.png";
import trendora from "@/assets/showcase-logo-14.png";
import vibeSpot from "@/assets/showcase-logo-15.png";
import vintageVibes from "@/assets/showcase-logo-16.jpg";
import logo17 from "@/assets/showcase-logo-17.svg";
import yurane from "@/assets/showcase-logo-18-yurane.jpg";
import noxx from "@/assets/showcase-logo-18-noxx.png";
import grabGadgets from "@/assets/showcase-logo-19-grab-gadgets.png";
import createForMe from "@/assets/showcase-logo-21-create-for-me.png";
import makeTheVibes from "@/assets/showcase-logo-23-make-the-vibes.png";
import leaderLessons from "@/assets/showcase-logo-24-leader-lessons.webp";
import gradientMark from "@/assets/showcase-logo-25-gradient-mark.jpg";
import reelCover1 from "@/assets/reel-cover-1.jpg";
import reelCover2 from "@/assets/reel-cover-2.jpg";
import reelCover3 from "@/assets/reel-cover-3.jpg";
import { MediaImage } from "@/components/MediaImage";
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
      { src: editMark.url, alt: "Video editing studio logo with film strip, play button, and scissors" },
      { src: logo17.url, alt: "Logo identity from the latest logo collection" },
      { src: yurane.url, alt: "Yurane logo with celestial line-art mark" },
      { src: noxx.url, alt: "Noxx royal emblem logo" },
      { src: grabGadgets.url, alt: "Grab Gadgets logo with handheld device icon" },
      { src: createForMe.url, alt: "Create For Me logo with gear mark" },
      { src: makeTheVibes.url, alt: "Make the Vibes logo identity" },
      { src: leaderLessons.url, alt: "Leader Lessons logo identity" },
      { src: gradientMark.url, alt: "Blue and cyan gradient logo mark" },
    ],
  },
  {
    number: "04",
    category: "Cover art carousel",
    title: "Album covers",
    description: "Two cinematic cover directions built around atmosphere, contrast, and a strong visual hook.",
    frame: "square",
    slides: [
      { src: albumWarning.url, alt: "The Last Warning Signal album cover" },
      { src: albumLife.url, alt: "All My Life album cover" },
    ],
  },
  {
    number: "05",
    category: "Flyer design",
    title: "Flyer studies",
    description: "Two focused flyer directions balancing clear messaging, strong hierarchy, and visual impact.",
    frame: "portrait",
    slides: [
      { src: ceramicFlyer.url, alt: "Ceramic Junction promotional flyer" },
      { src: hiringFlyer.url, alt: "Remote opportunities recruitment flyer" },
    ],
  },
  {
    number: "06",
    category: "Poster design",
    title: "Poster collection",
    description: "Bold poster compositions built to stop the scroll and communicate at a glance.",
    frame: "portrait",
    slides: [
      { src: poster13.url, alt: "Make Noise Break Patterns poster" },
      { src: poster14.url, alt: "Kurta Trends fashion poster" },
      { src: poster15.url, alt: "Actionsa Your Vote Your Voice poster" },
      { src: poster17.url, alt: "VettedBuddy brand services poster" },
      { src: poster18.url, alt: "Partnership secured promotional poster" },
    ],
  },
  {
    number: "07",
    category: "Reel design",
    title: "Reel covers",
    description: "Scroll-stopping reel covers built around bold typography, contrast, and a strong hook.",
    frame: "portrait",
    slides: [
      { src: reelCover1, alt: "Would You Hire Me reel cover with cinematic forest scene" },
      { src: reelCover2, alt: "Stop Chasing Clients, Attract Them Instead reel cover" },
      { src: reelCover3, alt: "Just One Idea reel cover with glowing lightbulb" },
    ],
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
      className="group mx-auto w-full max-w-[18.5rem] sm:mx-0 sm:max-w-none"
    >
      <div className={`relative overflow-hidden rounded-2xl border border-border/70 bg-foreground/[0.04] ${project.frame === "square" ? "aspect-square" : "aspect-[4/5]"}`}>
        <AnimatePresence mode="wait" initial={false}>
          <MediaImage
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