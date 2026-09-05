import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery-smooth inertial scrolling.
 * - Respects prefers-reduced-motion (no-op).
 * - Intercepts in-page hash links so anchors glide instead of jumping.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: globalThis.MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
