"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assembly } from "@/content/data";

gsap.registerPlugin(ScrollTrigger);

export default function Assembly() {
  const root = useRef<HTMLElement>(null);
  const rankRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toppingRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = gsap.context(() => {
        const curve = document.querySelector<SVGPathElement>(".assembly-curve");
        if (curve) {
          const len = curve.getTotalLength();
          gsap.set(curve, { strokeDasharray: len, strokeDashoffset: len });
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=4800",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const rank = p < 0.25 ? "#10" : p < 0.5 ? "#7" : p < 0.75 ? "#4" : p < 0.92 ? "#2" : "#1";
              if (rankRef.current) rankRef.current.textContent = rank;
            }
          }
        });
        if (curve) tl.to(curve, { strokeDashoffset: 0, duration: 3, ease: "none" }, 0);
        tl.to(".assembly-dot", { attr: { cx: 390, cy: 18 }, duration: 3, ease: "none" }, 0);
        tl.fromTo(".assembly-card", { scale: 0.92, filter: "blur(3px)", rotateX: 6, transformPerspective: 1000 }, { scale: 1.06, filter: "blur(0px)", rotateX: 0, duration: 4, ease: "power2.inOut" }, 0);
        tl.fromTo(".assembly-flash", { opacity: 0 }, { opacity: 0.85, duration: 0.35, yoyo: true, repeat: 1 }, 7.2);
        assembly.steps.forEach((_, i) => {
          const el = stepRefs.current[i];
          if (!el) return;
          tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, i === 0 ? 0.5 : ">");
          if (i < assembly.steps.length - 1) tl.to(el, { opacity: 0, y: -30, duration: 0.6 }, ">0.4");
        });
        assembly.layers.forEach((_, i) => {
          const el = layerRefs.current[i];
          if (!el) return;
          tl.fromTo(el, { opacity: 0, y: 60, scale: 0.94, rotateX: -55, transformPerspective: 900 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.9 }, 1 + i * 0.9);
        });
        assembly.toppings.forEach((_, i) => {
          const el = toppingRefs.current[i];
          if (!el) return;
          tl.fromTo(el, { opacity: 0, y: -70, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "bounce.out" }, 6 + i * 0.5);
        });
        tl.to(".assembly-card", { scale: 1.14, rotate: -1.5, y: -18, duration: 1 }, ">0.6");
        tl.to(".assembly-card", { scale: 1.06, rotate: 0, y: 0, duration: 0.9 }, ">0.3");
        tl.fromTo(".assembly-flash", { opacity: 0 }, { opacity: 0.9, duration: 0.35, yoyo: true, repeat: 1 }, ">0.2");
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="assembly" className="relative overflow-hidden bg-panel px-6 py-24 md:flex md:min-h-screen md:items-center md:py-0" aria-label="The Assembly">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs tracking-[0.35em] text-muted">{assembly.eyebrow.toUpperCase()}</p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">{assembly.title}</h2>
          <p className="mt-6 max-w-md text-base leading-8 text-muted">{assembly.caption}</p>
          <div className="relative mt-10 min-h-[180px]">
            {assembly.steps.map((step, i) => (
              <div key={step.stage} ref={(el) => { stepRefs.current[i] = el; }} className="md:absolute md:inset-0">
                <p className="text-sm font-semibold text-electric">{step.stage}</p>
                <p className="mt-2 text-lg text-mist">{step.text}</p>
                <p className="mt-2 text-sm text-muted">Ranking path: {step.rank}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-muted">Live rank</span>
            <span ref={rankRef} className="glow-border rounded-full bg-gradient-to-r from-electric to-violet px-4 py-1.5 font-display text-lg font-bold">#10</span>
          </div>
        </div>

        <div className="relative">
          <div className="assembly-flash pointer-events-none absolute -inset-6 z-10 rounded-[2rem] bg-gradient-to-br from-electric/30 via-transparent to-violet/30 opacity-0 blur-2xl" aria-hidden="true" />
          <div className="assembly-card glass relative rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Search ranking curve</p>
              <span className="text-xs text-muted">Position 10 to 1</span>
            </div>
            <svg viewBox="0 0 400 180" className="mt-6 w-full" role="img" aria-label="A ranking curve climbing from position 10 to position 1">
              <defs>
                <linearGradient id="curveGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {[40, 80, 120, 160].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#1e2433" strokeWidth="1" />)}
              <path className="assembly-curve" d="M10 150 C 90 145, 130 120, 190 95 S 310 35, 390 18" fill="none" stroke="url(#curveGrad)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="10" cy="150" r="6" fill="#3b82f6" />
              <circle className="assembly-dot" cx="10" cy="150" r="10" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
              <circle cx="390" cy="18" r="7" fill="#8b5cf6" />
              <text x="10" y="172" fill="#a7aec0" fontSize="12">#10</text>
              <text x="372" y="10" fill="#edeff5" fontSize="13" fontWeight="700">#1</text>
            </svg>
            <div className="mt-6 space-y-2" aria-label="Code layers">
              {assembly.layers.map((layer, i) => (
                <div key={layer} ref={(el) => { layerRefs.current[i] = el; }} className="flex items-center justify-between rounded-xl border border-line bg-ink/70 px-4 py-3">
                  <span className="font-mono text-sm">{layer}</span>
                  <span className="text-xs text-muted">Layer {i + 1} of 5</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {assembly.toppings.map((t, i) => (
                <div key={t.label} ref={(el) => { toppingRefs.current[i] = el; }} className="rounded-xl bg-gradient-to-br from-electric/25 to-violet/25 px-3 py-4 text-center">
                  <p className="text-xs text-muted">{t.label}</p>
                  <p className="mt-1 text-sm font-semibold">{t.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
