"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/content/data";

gsap.registerPlugin(ScrollTrigger);

function Lane({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="w-full shrink-0 md:w-[92vw] md:max-w-5xl">
      <div className="glass rounded-3xl p-6 md:p-10">
        <p className="text-xs tracking-[0.3em] text-muted">{tone}</p>
        <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">{title}</h3>
        <div className="mt-8 flex flex-wrap gap-3">
          {items.map((item, i) => (
            <span
              key={item}
              className="skill-chip rounded-full border border-line bg-ink/70 px-5 py-3 text-sm text-mist shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              style={{ transform: `translateZ(${((i % 3) + 1) * 12}px)` }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = gsap.context(() => {
        const el = track.current;
        if (!el) return;
        const distance = el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: -distance, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: `+=${distance + 400}`, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
        });
        gsap.fromTo(".skill-chip", { y: 50, opacity: 0, rotateY: 55, rotateX: -20, scale: 0.9, transformPerspective: 900 }, {
          y: 0, opacity: 1, rotateY: 0, rotateX: 0, scale: 1, stagger: 0.06, duration: 0.8, ease: "back.out(1.4)",
          scrollTrigger: { trigger: root.current, start: "top 60%" }
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={root} id="skills" className="overflow-hidden bg-panel px-6 py-24 md:px-0 md:py-0" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-0 py-4 md:px-12 md:pt-24">
        <p className="text-xs tracking-[0.35em] text-muted">SKILLS</p>
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">{skills.title}</h2>
        <p className="mt-4 max-w-xl text-muted">On desktop, scroll sideways through two lanes. On mobile, both lanes stack for fast reading.</p>
      </div>
      <div ref={track} className="mx-auto flex max-w-6xl flex-col gap-6 pb-4 md:w-max md:flex-row md:gap-10 md:px-12 md:pb-24">
        <Lane title="Marketing and growth" items={skills.marketing} tone="LANE 01 / MARKETING" />
        <Lane title="Engineering and automation" items={skills.engineering} tone="LANE 02 / ENGINEERING" />
      </div>
    </section>
  );
}
