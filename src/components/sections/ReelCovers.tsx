import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import reel1 from "@/assets/reel-cover-1.jpg";
import reel2 from "@/assets/reel-cover-2.jpg";
import reel3 from "@/assets/reel-cover-3.jpg";

const reels = [
  { src: reel1, alt: "Reel cover — Would You Hire Me, before and after cinematic forest design" },
  { src: reel2, alt: "Reel cover — Stop Chasing Clients, Attract Them Instead, black and turquoise design" },
  { src: reel3, alt: "Reel cover — Just One Idea, black and gold lightbulb design" },
];

export function ReelCovers() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => (i + dir + reels.length) % reels.length);
    },
    []
  );

  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [go, index]);

  return (
    <section id="reel-covers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <StaggerGroup className="mb-12 text-center sm:mb-16">
          <StaggerItem>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Video Editing
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Reel Covers
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Scroll-stopping covers designed to make every reel impossible to skip.
            </p>
          </StaggerItem>
        </StaggerGroup>

        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-2xl backdrop-blur-sm">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={reels[index].src}
                src={reels[index].src}
                alt={reels[index].alt}
                loading="lazy"
                custom={direction}
                initial={{ opacity: 0, x: direction * 60, scale: 1.04 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -60, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
              />
            </AnimatePresence>

            <button
              type="button"
              aria-label="Previous reel cover"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground backdrop-blur-md transition-colors hover:bg-background/90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next reel cover"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground backdrop-blur-md transition-colors hover:bg-background/90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {reels.map((r, i) => (
              <button
                key={r.src}
                type="button"
                aria-label={`Go to reel cover ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
