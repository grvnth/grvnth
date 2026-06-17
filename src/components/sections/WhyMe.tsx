import { motion } from "framer-motion";
import { Reveal } from "../Reveal";

const items = [
  "Modern Visuals",
  "Creative Solutions",
  "Attention To Detail",
  "Fast Delivery",
  "Client Focused",
  "Consistent Quality",
];

export function WhyMe() {
  return (
    <section id="why" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            ⟶ Why Work With Me
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            A standard you can <span className="italic text-muted-foreground">feel</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass flex items-center gap-4 rounded-2xl p-6"
              >
                <div className="glass-strong flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="text-base font-medium tracking-tight">{it}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
