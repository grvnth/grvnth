import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";

const line1 = ["Turning", "Ideas"];
const line2 = ["Into", "Impact."];

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
      <motion.div style={{ y: y1 }} className="glass absolute left-[6%] top-[22%] hidden h-32 w-32 rotate-12 rounded-3xl md:block animate-float-slow" />
      <motion.div style={{ y: y2 }} className="glass absolute right-[8%] top-[28%] hidden h-40 w-40 -rotate-6 rounded-full md:block animate-float-slow-2" />
      <motion.div style={{ y: y1 }} className="glass absolute bottom-[18%] right-[18%] hidden h-24 w-24 rotate-45 rounded-2xl lg:block animate-float-slow-2" />
      <motion.div style={{ y: y2 }} className="glass absolute bottom-[22%] left-[12%] hidden h-20 w-36 rounded-full lg:block animate-float-slow" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-foreground/70" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            </span>
            Graphic Designer · Video Editor
          </div>
        </Reveal>

        <h1 className="font-display text-balance text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-[7.5rem]">
          <span className="block overflow-hidden pb-2">
            {line1.map((w, i) => (
              <motion.span
                key={w}
                className="mr-4 inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden pb-2">
            {line2.map((w, i) => (
              <motion.span
                key={w}
                className={`mr-4 inline-block ${i === 0 ? "italic text-muted-foreground" : "animate-text-shine"}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.55 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <Reveal delay={0.9}>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            Helping brands, creators, businesses, startups, and personal brands stand out
            through impactful visuals and content.
          </p>
        </Reveal>

        <Reveal delay={1.05}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <motion.a
              href="https://drive.google.com/drive/folders/1GrIJ8rAO8mg1UYMEUVJkP1e-0dSX9ady"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">View My Designs</span>
              <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glass-strong inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-sm font-medium text-foreground sm:w-auto"
            >
              Contact Me
            </motion.a>
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.8, duration: 1 }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll
      </motion.div>
    </section>
  );
}
