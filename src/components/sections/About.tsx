import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yHeading = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yBody = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.4, 1, 1, 0.6]);

  return (
    <section id="about" ref={ref} className="relative px-5 py-28 sm:py-40">
      <motion.div style={{ opacity }} className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-muted-foreground">
            ⟶ About
          </p>
        </Reveal>

        <motion.h2
          style={{ y: yHeading }}
          className="mt-6 font-display text-balance text-[2.5rem] font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <StaggerGroup stagger={0.12}>
            <StaggerItem className="block overflow-hidden">
              <span className="block">Visuals with intent.</span>
            </StaggerItem>
            <StaggerItem className="block overflow-hidden">
              <span className="block italic font-extralight text-muted-foreground">
                Stories that linger.
              </span>
            </StaggerItem>
          </StaggerGroup>
        </motion.h2>

        <motion.div style={{ y: yBody }} className="mt-14 grid gap-8 md:grid-cols-2">
          <StaggerGroup stagger={0.12} delay={0.1}>
            <StaggerItem>
              <p className="text-pretty text-lg leading-[1.7] tracking-[-0.005em] text-muted-foreground">
                Passionate about transforming ideas into visuals and videos that capture
                attention, tell stories, and leave a lasting impression.
              </p>
            </StaggerItem>
          </StaggerGroup>
          <StaggerGroup stagger={0.12} delay={0.2}>
            <div className="space-y-6">
              <StaggerItem>
                <p className="text-pretty leading-[1.75] tracking-[-0.005em] text-muted-foreground">
                  As a Graphic Designer and Video Editor, I create engaging content that
                  blends creativity, strategy, and storytelling to help brands, businesses,
                  and creators stand out.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-pretty leading-[1.75] tracking-[-0.005em] text-muted-foreground">
                  From social media creatives and branding to promotional videos and digital
                  content, I focus on delivering impactful, modern, and memorable visual
                  experiences.
                </p>
              </StaggerItem>
            </div>
          </StaggerGroup>
        </motion.div>
      </motion.div>
    </section>
  );
}
