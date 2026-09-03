import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import reel1 from "@/assets/reel-cover-1.jpg";
import reel2 from "@/assets/reel-cover-2.jpg";
import reel3 from "@/assets/reel-cover-3.jpg";

const reels = [
  { src: reel1, alt: "Reel cover one" },
  { src: reel2, alt: "Reel cover two" },
  { src: reel3, alt: "Reel cover three" },
];

export function ReelCovers() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-x-6 gap-y-16 sm:grid-cols-3">
          {reels.map((reel, i) => (
            <motion.article
              key={reel.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              onClick={() => setActive(i)}
              className={i === active ? "ring-2 ring-primary" : ""}
            >
              <img src={reel.src} alt={reel.alt} loading="lazy" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
