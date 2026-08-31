import { Magnetic } from "./Reveal";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Why Me", href: "#why" },
  { label: "Experience", href: "#experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["about", "services", "work", "why", "experience", "reviews", "contact"];

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], [0.5, 1]);
  const opacity = useSpring(bg, { stiffness: 120, damping: 20 });
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    return scrollY.on("change", (v) => {
      const goingDown = v > last && v > 220;
      last = v;
      setHidden(goingDown);
    });
  }, [scrollY]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 sm:top-6"
    >
      <motion.div
        style={{ opacity }}
        className="glass flex items-center justify-between rounded-full px-5 py-3 sm:px-6"
      >
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          Granth<span className="text-muted-foreground">.</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/10"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            );
          })}
        </nav>
        <Magnetic strength={0.35}>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-foreground px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-wider text-background"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Let's Talk</span>
          </motion.a>
        </Magnetic>
      </motion.div>
    </motion.header>
  );
}
