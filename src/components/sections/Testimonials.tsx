import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "../Reveal";

const reviews = [
  "Exceptional work quality and attention to detail. Every project exceeded expectations.",
  "Fast delivery, great communication, and professional results throughout the entire process.",
  "Creative, reliable, and highly skilled. The final designs helped elevate our brand presence.",
  "Understood our requirements perfectly and delivered visuals that stood out immediately.",
  "Professional experience from start to finish. Highly recommended for design and editing projects.",
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-center text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            ⟶ Testimonials
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-center font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Words from <span className="italic text-muted-foreground">collaborators</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="glass-strong relative mt-14 overflow-hidden rounded-3xl p-8 sm:p-14">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="min-h-[180px] sm:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="text-foreground/90 tracking-[0.4em] text-sm">★★★★★</div>
                  <p className="mt-6 font-display text-2xl leading-snug text-balance sm:text-3xl">
                    "{reviews[i]}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Review ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-8 bg-foreground" : "w-1.5 bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
