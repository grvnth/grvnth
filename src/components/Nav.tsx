import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Me", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 sm:top-6"
    >
      <div className="glass flex items-center justify-between rounded-full px-5 py-3 sm:px-6">
        <a href="#top" className="font-display text-xl tracking-tight">
          Granth<span className="text-muted-foreground">.</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-wider text-background transition-transform hover:scale-[1.03]"
        >
          Let's Talk
        </a>
      </div>
    </motion.header>
  );
}
