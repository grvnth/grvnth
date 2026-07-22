import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Background } from "@/components/Background";
import { CursorGlow } from "@/components/CursorGlow";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Loader } from "@/components/Loader";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyMe } from "@/components/sections/WhyMe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Granth Agrawal | Freelance Graphic Designer & Video Editor" },
      {
        name: "description",
        content:
          "Creating premium graphic design, motion graphics, and video editing that help brands, creators, and startups grow through impactful visual storytelling.",
      },
      { property: "og:title", content: "Granth Agrawal | Freelance Graphic Designer & Video Editor" },
      {
        property: "og:description",
        content: "Creating premium graphic design, motion graphics, and video editing that help brands, creators, and startups grow through impactful visual storytelling.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative grain min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      <Background />
      <CursorGlow />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Stats />
        <WhyMe />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
