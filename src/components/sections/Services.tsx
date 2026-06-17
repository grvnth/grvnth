import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";

const services = [
  { n: "01", t: "Graphic Design", d: "Bold, modern visuals that command attention across every surface." },
  { n: "02", t: "Video Editing", d: "Cinematic cuts, rhythm, and pacing that hold the viewer in." },
  { n: "03", t: "Social Media Design", d: "Scroll-stopping creatives engineered for the feed." },
  { n: "04", t: "Branding", d: "Identity systems with a distinct voice and lasting recall." },
  { n: "05", t: "Thumbnail Design", d: "Click-worthy thumbnails crafted to drive watch-time." },
  { n: "06", t: "Motion Graphics", d: "Animated typography and effects that bring stories to life." },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="services" ref={ref} className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          style={{ y: yTitle }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-muted-foreground">
                ⟶ Services
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-balance text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                Crafted across
                <br />
                <span className="italic font-semibold text-muted-foreground">
                  every medium.
                </span>
              </h2>
            </Reveal>
          </div>
        </motion.div>

        <motion.div
          style={{ y: yGrid }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.div
              key={s.n}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="glass group relative h-full overflow-hidden rounded-3xl p-7"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold tracking-tight text-muted-foreground">
                  {s.n}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
              </div>
              <h3 className="mt-12 font-display text-[1.6rem] font-bold leading-[1.1] tracking-[-0.02em]">
                {s.t}
              </h3>
              <p className="mt-3 text-sm leading-[1.65] tracking-[-0.005em] text-muted-foreground">
                {s.d}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
