import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-32 sm:pt-40"
    >
      {/* floating glass shapes */}
      <motion.div
        style={{ y: y1 }}
        className="glass absolute left-[6%] top-[22%] hidden h-32 w-32 rotate-12 rounded-3xl md:block"
      />
      <motion.div
        style={{ y: y2 }}
        className="glass absolute right-[8%] top-[28%] hidden h-40 w-40 -rotate-6 rounded-full md:block"
      />
      <motion.div
        style={{ y: y1 }}
        className="glass absolute bottom-[18%] right-[18%] hidden h-24 w-24 rotate-45 rounded-2xl lg:block"
      />
      <motion.div
        style={{ y: y2 }}
        className="glass absolute bottom-[22%] left-[12%] hidden h-20 w-36 rounded-full lg:block"
      />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            Graphic Designer · Video Editor
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display text-balance text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-[7.5rem]">
            Turning Ideas
            <br />
            <span className="italic text-muted-foreground">Into</span> Impact.
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            Helping brands, creators, businesses, startups, and personal brands stand out
            through impactful visuals and content.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://drive.google.com/drive/folders/1GrIJ8rAO8mg1UYMEUVJkP1e-0dSX9ady"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <span className="relative z-10">View My Designs</span>
              <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://wa.me/919549946123"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-strong inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-sm font-medium text-foreground transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Contact Me
            </a>
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll
      </motion.div>
    </section>
  );
}
