"use client";
import { useEffect, useRef, useState } from "react";
import { assembly } from "@/content/data";

/*
  Fast alternative to the pinned Assembly scene.
  No GSAP, no Lenis, no canvas, no WebGL, no blur, no 3D transforms.
  Motion is CSS only, transform and opacity only, and only runs once
  when the card enters the viewport, so the main thread stays free
  and the layout never shifts: every step lives in normal flow.
*/
export default function AssemblyFast() {
  const root = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={root}
      id="assembly-fast"
      className="relative bg-panel px-6 py-20 md:py-24"
      aria-label="From invisible to inevitable, fast version"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-xs tracking-[0.35em] text-muted">{assembly.eyebrow.toUpperCase()}</p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {assembly.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-8 text-muted">{assembly.caption}</p>
          <div className="mt-8 grid gap-3">
            {assembly.steps.map((step, i) => (
              <article
                key={step.stage}
                className={`fast-step rounded-2xl border border-line bg-ink px-5 py-4 ${inView ? "fast-step-in" : ""}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-electric">{step.stage}</p>
                  <p className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-black">{step.rank}</p>
                </div>
                <p className="mt-2 text-base leading-7 text-mist">{step.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={`fast-card rounded-3xl border border-line bg-ink p-6 md:p-7 ${inView ? "fast-card-in" : ""}`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Search ranking curve</p>
            <span className="text-xs text-muted">Position 10 to 1</span>
          </div>
          <svg viewBox="0 0 400 180" className="mt-6 w-full" role="img" aria-label="A ranking curve climbing from position 10 to position 1">
            <defs>
              <linearGradient id="fastCurveGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#1e2433" strokeWidth="1" />
            ))}
            <path
              className={`fast-curve ${inView ? "fast-curve-in" : ""}`}
              d="M10 150 C 90 145, 130 120, 190 95 S 310 35, 390 18"
              fill="none"
              stroke="url(#fastCurveGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="10" cy="150" r="6" fill="#3b82f6" />
            <circle cx="390" cy="18" r="7" fill="#8b5cf6" />
            <text x="10" y="172" fill="#a7aec0" fontSize="12">#10</text>
            <text x="372" y="10" fill="#edeff5" fontSize="13" fontWeight="700">#1</text>
          </svg>
          <div className="mt-6 space-y-2" aria-label="Code layers">
            {assembly.layers.map((layer, i) => (
              <div key={layer} className="flex items-center justify-between rounded-xl border border-line bg-panel px-4 py-3">
                <span className="font-mono text-sm">{layer}</span>
                <span className="text-xs text-muted">Layer {i + 1} of 5</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {assembly.toppings.map((t) => (
              <div key={t.label} className="rounded-xl bg-panel px-3 py-4 text-center">
                <p className="text-xs text-muted">{t.label}</p>
                <p className="mt-1 text-sm font-semibold">{t.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-muted">
            No pin, no long scroll, no canvas. The card animates once, in place, then stays still.
          </p>
        </div>
      </div>
    </section>
  );
}
