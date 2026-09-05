import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import socialHomepageAsset from "@/assets/social-homepage.jpg.asset.json";
import { Background } from "@/components/Background";
import { CursorGlow } from "@/components/CursorGlow";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Loader } from "@/components/Loader";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyMe } from "@/components/sections/WhyMe";
import { getRequestOrigin } from "@/lib/origin.functions";

const title = "Granth Agrawal | Graphic Designer, Video Editor & Visual Communicator";
const description =
  "Granth Agrawal is a freelance graphic designer, video editor and visual communicator creating impactful branding, motion graphics and video content for brands, startups, businesses and creators.";
const fallbackOrigin = "https://grvnth.lovable.app";

export const Route = createFileRoute("/")({
  loader: async () => {
    const origin = await getRequestOrigin();
    return {
      origin,
      socialImageUrl: `${origin}${socialHomepageAsset.url}`,
    };
  },
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? fallbackOrigin;
    const socialImageUrl =
      loaderData?.socialImageUrl ?? `${fallbackOrigin}${socialHomepageAsset.url}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${origin}/` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: socialImageUrl },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: socialImageUrl },
      ],
      links: [{ rel: "canonical", href: `${origin}/` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Granth Agrawal",
            url: `${origin}/`,
            jobTitle: "Graphic Designer, Video Editor & Visual Communicator",
            description,
            email: "mailto:hello@grvnth.cc.cd",
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
    };
  },
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

      <SmoothScroll />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Showcase />
        <Stats />
        <WhyMe />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
