import { motion } from "framer-motion";
import { Reveal } from "../Reveal";

const services = [
  { n: "01", t: "Graphic Design", d: "Bold, modern visuals that command attention across every surface." },
  { n: "02", t: "Video Editing", d: "Cinematic cuts, rhythm, and pacing that hold the viewer in." },
  { n: "03", t: "Social Media Design", d: "Scroll-stopping creatives engineered for the feed." },
  { n: "04", t: "Branding", d: "Identity systems with a distinct voice and lasting recall." },
  { n: "05", t: "Thumbnail Design", d: "Click-worthy thumbnails crafted to drive watch-time." },
  { n: "06", t: "Motion Graphics", d: "Animated typography and effects that bring stories to life." },
];

export function Services() {
  return (
    <section id="services" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
                ⟶ Services
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                Crafted across<br />every medium.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="glass group relative h-full overflow-hidden rounded-3xl p-7"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-muted-foreground">{s.n}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                </div>
                <h3 className="mt-12 font-display text-2xl tracking-tight">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
