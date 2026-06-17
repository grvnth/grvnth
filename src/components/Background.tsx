export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-white/5 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-white/4 blur-[140px] animate-float-slow-2" />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-white/3 blur-[120px] animate-float-slow" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
