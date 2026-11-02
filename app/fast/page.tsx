import type { Metadata } from "next";
import AssemblyFast from "@/components/AssemblyFast";
import SoundTheme from "@/components/SoundTheme";
import { site } from "@/content/data";

export const metadata: Metadata = {
  title: "Find the demand. Build the proof. Grow the result. | Fast version",
  description: "A fast, lightweight version of the Assembly story: CSS motion only, no pin, no canvas, no WebGL.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

/*
  Fast preview page.
  Deliberately plain: no preloader, no Lenis, no GSAP, no dust canvas,
  no cursor trail, no marquee, no three.js particles, no images.
  Only the fast Assembly card, which uses one small IntersectionObserver
  and CSS transform and opacity animations.
*/
export default function FastPage() {
  return (
    <main id="main">
      <SoundTheme />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="font-display text-lg font-bold tracking-tight">
          IK<span className="text-gradient">U</span>
        </a>
        <a href="/" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
          View full film version
        </a>
      </header>
      <section className="mx-auto w-full max-w-6xl px-6 pb-4 pt-10">
        <p className="text-xs tracking-[0.35em] text-muted">FAST PREVIEW / NO HEAVY MOTION</p>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-muted">
          {site.heroSubtitle}. This page loads the same Strategy and Growth story with
          lightweight motion only, so it stays fast on slow phones and slow connections.
        </p>
      </section>
      <AssemblyFast />
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">Let&apos;s build something that ranks.</h2>
        <p className="mt-4 max-w-xl text-base leading-8 text-muted">
          Tell me about your market, your product, and the result you need. I will reply
          with a clear next step, not a generic pitch.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/#contact" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black">
            Start a project
          </a>
          <a href="/" className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-mist">
            Back to the full site
          </a>
        </div>
      </section>
    </main>
  );
}
