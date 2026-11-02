"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, metrics } from "@/content/data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".metric-card", { y: 50, opacity: 0, scale: 0.9, rotateX: -18, transformPerspective: 900 }, {
        y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".metric-card", start: "top 85%" }
      });
      gsap.fromTo(".timeline-line", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".timeline", start: "top 75%", end: "bottom 60%", scrub: 1 }
      });
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.fromTo(item, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%" }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="experience" className="max-reveal px-6 py-24 md:px-12 md:py-32" aria-label="Experience">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.35em] text-muted">EXPERIENCE</p>
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">Work that compounds.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="metric-card glass rounded-3xl p-6">
              <p className="font-display text-4xl font-bold text-gradient">{m.value}</p>
              <p className="mt-2 font-semibold">{m.label}</p>
              {m.note ? <p className="mt-1 text-sm text-muted">{m.note}</p> : null}
            </div>
          ))}
        </div>
        <div className="timeline relative mt-16 pl-8 md:pl-12">
          <div className="timeline-line absolute bottom-0 left-2 top-0 w-px origin-top bg-gradient-to-b from-electric to-violet md:left-4" aria-hidden="true" />
          <ol className="space-y-10">
            {experience.map((job) => (
              <li key={job.role} className="timeline-item relative">
                <span className="absolute -left-8 top-2 h-4 w-4 rounded-full border-2 border-violet bg-ink md:-left-12" aria-hidden="true" />
                <div className="glass rounded-3xl p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold">{job.role}</h3>
                    <span className="text-sm text-muted">{job.period}</span>
                  </div>
                  <p className="mt-2 font-semibold text-electric">{job.company}</p>
                  {job.featured && <p className="mt-3 inline-block rounded-full bg-violet/20 px-3 py-1 text-xs font-semibold text-white">Featured role</p>}
                  <ul className="mt-5 space-y-2 text-muted">
                    {job.highlights.map((h) => <li key={h} className="leading-7">{h}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
