export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_60%)]" />

      {/* aurora orbs — painted as soft radial gradients (no filter: blur) so they
          stay cheap to composite while animating */}
      <div
        className="orb absolute -top-40 -left-40 h-[620px] w-[620px] animate-aurora"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        className="orb absolute top-1/3 -right-40 h-[520px] w-[520px] animate-drift"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.09), rgba(255,255,255,0) 70%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="orb absolute bottom-0 left-1/3 h-[520px] w-[520px] animate-aurora"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.07), rgba(255,255,255,0) 70%)",
          animationDelay: "-10s",
        }}
      />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* grain — desktop only, blend modes are costly on mobile GPUs */}
      <div
        className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
