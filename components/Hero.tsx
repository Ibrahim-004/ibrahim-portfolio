"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/data";

gsap.registerPlugin(ScrollTrigger);
const Particles = dynamic(() => import("./Particles"), { ssr: false, loading: () => null });

export default function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-letter", { yPercent: 120, rotate: 4, opacity: 0, filter: "blur(14px)" }, { yPercent: 0, rotate: 0, opacity: 1, filter: "blur(0px)", duration: 1.15, stagger: 0.04, ease: "power4.out" });
      gsap.fromTo(".hero-fade", { y: 36, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.13, delay: 0.6, ease: "power3.out" });
      gsap.to(".hero-title", {
        scale: 0.86, opacity: 0.25, y: -80, filter: "blur(3px)", ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.to(".hero-orbs", {
        y: 160, scale: 1.25, opacity: 0.4, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.fromTo(".hero-leak", { xPercent: -140 }, { xPercent: 160, duration: 2.2, delay: 0.9, ease: "power2.inOut" });
    }, root);
    return () => ctx.revert();
  }, [started]);

  const onMouse = (e: React.MouseEvent) => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = root.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (glow.current) gsap.to(glow.current, { x: px * 90, y: py * 60, duration: 0.9, ease: "power2.out" });
    if (orb1.current) gsap.to(orb1.current, { x: px * 60, y: py * 40, duration: 1.1, ease: "power2.out" });
    if (orb2.current) gsap.to(orb2.current, { x: px * -80, y: py * -50, duration: 1.3, ease: "power2.out" });
    gsap.to(".hero-title", { x: px * -22, y: py * -12, duration: 1, ease: "power2.out" });
  };

  const magnetic = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `translate(${px * 14}px, ${py * 10}px) scale(1.04)`;
  };
  const magneticOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; };

  return (
    <section ref={root} onMouseMove={onMouse} className="animated-gradient relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12" aria-label="Introduction">
      <div className="hero-orbs absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="kenburns absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.28),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.30),transparent_48%)]" />
        <div className="absolute inset-0 hidden md:block"><Particles /></div>
        <div ref={orb1} className="float-slow absolute left-[12%] top-[22%] h-56 w-56 rounded-full bg-electric/25 blur-[90px]" />
        <div ref={orb2} className="float-slow absolute right-[10%] top-[58%] h-72 w-72 rounded-full bg-violet/25 blur-[100px]" style={{ animationDelay: "1.2s" }} />
      </div>
      <div ref={glow} className="glow-pulse pointer-events-none absolute left-1/2 top-1/3 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-[120px]" aria-hidden="true" />
      <div className="hero-leak pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink via-ink/60 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl">
        <p className="hero-fade text-xs font-medium tracking-[0.35em] text-muted md:text-sm">PORTFOLIO / 2026 / A CINEMATIC INTRODUCTION</p>
        <h1 className="hero-title mt-8 font-display font-bold leading-[0.92] tracking-[-0.04em]">
          {site.heroTitle.map((word, wi) => (
            <span key={word} className="block overflow-hidden pb-1 text-[13vw] md:text-[7.5rem]">
              <span className="block">
                {word.split("").map((letter, li) => (
                  <span key={`${wi}-${li}`} className="hero-letter inline-block">{letter}</span>
                ))}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-fade mt-8 max-w-xl text-xl text-mist md:text-2xl">
          <span className="text-gradient font-semibold">{site.heroSubtitle}</span>
        </p>
        <p className="hero-fade mt-4 max-w-xl text-base leading-8 text-muted md:text-lg">{site.heroIntro}</p>
        <div className="hero-fade mt-10 flex flex-wrap gap-4">
          <a href="#projects" onMouseMove={magnetic} onMouseLeave={magneticOut} className="magnetic-btn rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black focus-visible:outline-violet">View selected work</a>
          <a href="#contact" onMouseMove={magnetic} onMouseLeave={magneticOut} className="magnetic-btn glass rounded-full px-7 py-3.5 text-sm font-semibold text-white hover:border-violet/60">Start a project</a>
        </div>
        <div className="hero-fade mt-16 flex flex-wrap gap-8 text-sm text-muted">
          <span>Chattogram, Bangladesh</span>
          <span>SEO and outreach</span>
          <span>Full stack development</span>
        </div>
      </div>
      <div className="hero-fade absolute bottom-24 right-8 hidden h-32 w-32 md:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
          <defs><path id="badgeCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
          <text className="fill-white/80 text-[8.5px] tracking-[0.18em]"><textPath href="#badgeCircle">LET'S BUILD SOMETHING THAT RANKS • SEO • DEVELOPMENT •</textPath></text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl">↓</span>
      </div>
      <a href="#assembly" className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 text-center" aria-label="Scroll to the Assembly scene">
        <span className="block text-xs tracking-[0.3em] text-muted">SCROLL FOR THE FILM</span>
        <span className="mx-auto mt-3 block h-12 w-px animate-pulse bg-gradient-to-b from-electric to-violet" aria-hidden="true" />
      </a>
    </section>
  );
}
