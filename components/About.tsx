"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/content/data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".about-line", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" }
      });
      gsap.fromTo(".about-sweep", { xPercent: -120 }, {
        xPercent: 120, duration: 1.2, ease: "power2.inOut",
        scrollTrigger: { trigger: ".about-photo", start: "top 80%" }
      });
      gsap.fromTo(".about-photo", { scale: 0.96, opacity: 0.6 }, {
        scale: 1, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-photo", start: "top 80%" }
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="about" className="max-reveal px-6 py-24 md:px-12 md:py-32" aria-label="About">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div className="about-photo glow-border relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-line">
          <Image src="/ibrahim.jpg" alt={about.photoAlt} width={1080} height={1350} className="h-auto w-full object-cover" priority={false} />
          <div className="about-sweep pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden="true" />
          <p className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-xs text-white">Ibrahim Khalil Ullah</p>
        </div>
        <div>
          <p className="about-line text-xs tracking-[0.35em] text-muted">ABOUT</p>
          <h2 className="about-line mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{about.title}</h2>
          <p className="about-line mt-8 text-lg leading-8 text-mist">{about.objective}</p>
          <p className="about-line mt-4 text-base leading-8 text-muted">{about.summary}</p>
          <p className="about-line mt-4 text-base leading-8 text-muted">{about.detail}</p>
          <div className="about-line mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="glass rounded-2xl p-4"><p className="font-display text-2xl font-bold text-gradient">1.5+</p><p className="mt-1 text-xs leading-5 text-muted">Years in SEO and outreach</p></div>
            <div className="glass rounded-2xl p-4"><p className="font-display text-2xl font-bold text-gradient">1+</p><p className="mt-1 text-xs leading-5 text-muted">Year in full stack development</p></div>
            <div className="glass rounded-2xl p-4"><p className="font-display text-2xl font-bold text-gradient">3</p><p className="mt-1 text-xs leading-5 text-muted">Professional roles</p></div>
            <div className="glass rounded-2xl p-4"><p className="font-display text-2xl font-bold text-gradient">6</p><p className="mt-1 text-xs leading-5 text-muted">Selected projects</p></div>
          </div>
          <div className="about-line mt-6 rounded-2xl border border-line bg-panel p-5">
            <p className="text-xs tracking-[0.25em] text-muted">EDUCATION</p>
            <p className="mt-3 text-sm leading-6 text-mist">BSc in Computer Science and Engineering, Britannia University, 2020, CGPA 3.08</p>
            <p className="mt-2 text-sm leading-6 text-muted">Higher Secondary Certificate (Science), Comilla Government College, 2013, GPA 4.50</p>
            <p className="mt-2 text-sm leading-6 text-muted">Secondary School Certificate (Science), 2011, GPA 5.00</p>
          </div>
          <p className="about-line mt-6 rounded-xl border border-line bg-panel p-4 text-sm leading-6 text-muted">{about.photoNote}</p>
        </div>
      </div>
    </section>
  );
}
