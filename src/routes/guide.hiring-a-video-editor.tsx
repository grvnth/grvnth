import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://grvnth.lovable.app/guide/hiring-a-video-editor";
const TITLE = "Videographer vs Video Editor: How to Hire the Right Talent";
const DESCRIPTION =
  "A practical guide to the difference between a videographer and a video editor, when you need each, and how specialized post-production drives brand growth.";

export const Route = createFileRoute("/guide/hiring-a-video-editor")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          author: { "@type": "Person", name: "Granth Agrawal", url: "https://grvnth.lovable.app/" },
          mainEntityOfPage: CANONICAL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the difference between a videographer and a video editor?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A videographer captures footage on set — camera, lighting, and audio. A video editor works in post-production, assembling that footage into a finished story with pacing, color, sound design, and motion graphics. They are two distinct crafts with different tools and instincts.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need both a videographer and a video editor?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For most brand and creator work, yes. A videographer alone gives you raw footage; a specialist editor turns that footage into content that holds attention, communicates the message, and performs on social platforms.",
              },
            },
            {
              "@type": "Question",
              name: "When should I hire a hybrid videographer/editor?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Hybrid videographer/editors work well for small shoots, event recaps, and fast-turnaround social content. For campaigns, launches, and any project where post-production quality drives the result, hire a specialist editor.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HiringGuide,
});

function HiringGuide() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-5 py-24 sm:py-32">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          ⟶ Guide
        </p>
        <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          Videographer vs Video Editor:{" "}
          <span className="italic font-semibold text-muted-foreground">
            how to hire the right talent
          </span>
          .
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          The terms <em>videographer</em> and <em>video editor</em> get used
          interchangeably, and search intent for “videographer/editor” often blurs
          the two. They are not the same job. Understanding the difference is the
          fastest way to spend your budget on the person who will actually move
          the needle for your brand.
        </p>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The short version
          </h2>
          <p className="leading-relaxed text-foreground/90">
            A <strong>videographer</strong> operates the camera. They handle
            framing, lighting, movement, and on-set audio — everything that
            happens before the record button stops. A <strong>video editor</strong>{" "}
            takes that raw footage and shapes it into a finished piece: pacing,
            structure, color, sound design, motion graphics, captions, and export
            for every platform.
          </p>
          <p className="leading-relaxed text-foreground/90">
            One captures. One tells the story. Great brand video needs both.
          </p>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What a videographer actually does
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-foreground/90">
            <li>Plans shots, angles, and coverage for the day.</li>
            <li>Owns the camera, lenses, lighting, and audio capture.</li>
            <li>Directs subjects on set — where to stand, what to say, how to move.</li>
            <li>Delivers organized raw footage and audio to post-production.</li>
          </ul>
          <p className="leading-relaxed text-foreground/90">
            A strong videographer gives you clean, well-lit, well-composed
            material with room to cut. A weak one leaves the editor fixing
            problems that should never have made it off set.
          </p>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What a video editor actually does
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-foreground/90">
            <li>
              Builds the story: selecting takes, cutting for pace, structuring
              the narrative so viewers stay to the end.
            </li>
            <li>
              Color grades so every shot feels intentional and matches your
              brand.
            </li>
            <li>
              Designs the sound: music, sfx, dialogue leveling, so the piece
              feels premium instead of amateur.
            </li>
            <li>
              Adds motion graphics, titles, lower-thirds, and captions that
              carry the message even on mute.
            </li>
            <li>
              Exports and reformats for YouTube, Reels, Shorts, TikTok, and
              LinkedIn — each with the right aspect ratio and pacing.
            </li>
          </ul>
          <p className="leading-relaxed text-foreground/90">
            This is where a piece of content becomes a piece of{" "}
            <strong>brand</strong>. It is also where most videos quietly fail —
            the footage was fine, the edit was flat, and the video underperformed.
          </p>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Why specialized post-production matters for growth
          </h2>
          <p className="leading-relaxed text-foreground/90">
            On every social platform, retention decides distribution. The first
            three seconds decide whether anyone sees the rest. Retention is an
            editing problem, not a camera problem — it is created in the cut,
            the sound design, and the on-screen text.
          </p>
          <p className="leading-relaxed text-foreground/90">
            A specialist editor is trained on that outcome. They think in hooks,
            beats, and payoff. A hybrid videographer/editor who spends most days
            on set will rarely have the same instinct for how a Reel opens or
            why a two-frame trim changes whether viewers stay.
          </p>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            When to hire a hybrid videographer/editor
          </h2>
          <p className="leading-relaxed text-foreground/90">
            Hybrid talent is the right call when scope and turnaround matter
            more than post-production polish:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-foreground/90">
            <li>Event recaps and behind-the-scenes coverage.</li>
            <li>Weekly or daily social content on a tight budget.</li>
            <li>Founder-led talking-head clips shot in one location.</li>
            <li>Prototype and testing videos where speed beats craft.</li>
          </ul>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            When to hire a specialist video editor
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-foreground/90">
            <li>Launch films, brand films, and campaign videos.</li>
            <li>Founder or personal-brand content where you want scroll-stopping edits.</li>
            <li>Ads where every second is measured against a CPM.</li>
            <li>Long-form YouTube where retention curves decide the algorithm.</li>
            <li>Any project with existing footage that has not performed.</li>
          </ul>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            How to evaluate a video editor before you hire
          </h2>
          <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
            <li>
              <strong>Watch full pieces, not showreels.</strong> Showreels hide
              pacing. A three-minute cut tells you whether the editor can hold
              attention.
            </li>
            <li>
              <strong>Ask what they cut out and why.</strong> Great editors talk
              about what they removed. Weak editors talk about effects they added.
            </li>
            <li>
              <strong>Check sound design.</strong> Mute the video and then play
              only the audio. If either half falls apart, so will the finished
              piece.
            </li>
            <li>
              <strong>Look for platform range.</strong> A modern editor should
              cut the same story differently for YouTube, Reels, and Shorts —
              not just export the same file three times.
            </li>
            <li>
              <strong>Talk about turnaround and revisions.</strong> Two rounds
              of thoughtful revisions beats unlimited rounds of guesswork.
            </li>
          </ol>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            A simple hiring rule of thumb
          </h2>
          <p className="leading-relaxed text-foreground/90">
            If the value of the video depends on how it is told — hire a
            specialist editor and pair them with a videographer for the shoot.
            If the value depends on being there — hire a hybrid videographer/editor
            and accept that the edit will be functional, not exceptional.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Need a specialist editor for your next project?
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            I edit brand films, launch videos, and short-form content built to
            hold attention and convert. If you have footage that is not
            performing — or a shoot coming up and you want the post handled
            properly — let's talk.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
            >
              Back to home
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
