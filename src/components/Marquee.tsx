const items = [
  "Graphic Design",
  "Video Editing",
  "Brand Identity",
  "Motion Graphics",
  "Social Media",
  "Thumbnails",
  "Reels & Shorts",
  "Logo Design",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-white/10 bg-background/30 py-6 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-12 font-display text-3xl tracking-tight text-muted-foreground sm:text-4xl">
            <span className="transition-colors hover:text-foreground">{t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
