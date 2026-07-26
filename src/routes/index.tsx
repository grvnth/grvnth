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
        content:
          "Creating premium graphic design, motion graphics, and video editing that help brands, creators, and startups grow through impactful visual storytelling.",
      },
      { property: "og:url", content: "https://grvnth.lovable.app/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1c984baf-d1f9-480a-a2db-48e4309058a2" },
      { name: "twitter:title", content: "Granth Agrawal | Freelance Graphic Designer & Video Editor" },
      { name: "twitter:description", content: "Creating premium graphic design, motion graphics, and video editing that help brands, creators, and startups grow through impactful visual storytelling." },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1c984baf-d1f9-480a-a2db-48e4309058a2" },
    ],
    links: [{ rel: "canonical", href: "https://grvnth.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Granth Agrawal",
          url: "https://grvnth.lovable.app/",
          jobTitle: "Freelance Graphic Designer & Video Editor",
          email: "mailto:grvnth.design@gmail.com",
          sameAs: [
            "https://instagram.com/_grvnth_",
            "https://linkedin.com/in/granth-agrawal-8926a039a",
          ],
          knowsAbout: [
            "Graphic Design",
            "Video Editing",
            "Motion Graphics",
            "Brand Identity",
            "Post-Production",
          ],
          makesOffer: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Editing" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motion Graphics" } },
          ],
        }),
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
      <ScrollProgress />
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
