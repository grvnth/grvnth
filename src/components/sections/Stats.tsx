import { motion } from "framer-motion";
import { Reveal } from "../Reveal";

const stats = [
  { v: "100+", l: "Projects Completed" },
  { v: "50+", l: "Happy Clients" },
  { v: "2+", l: "Years of Experience" },
  { v: "24/7", l: "Communication & Support" },
];

export function Stats() {
  return (
    <section className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass relative overflow-hidden rounded-3xl p-8 text-center"
              >
                <div className="font-display text-5xl tracking-tight sm:text-6xl">{s.v}</div>
                <div className="mt-3 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.l}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
