"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Cinematic() {
  const bar = useRef<HTMLDivElement>(null);
  const wipe = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    const ctx = gsap.context(() => {
      document.querySelectorAll("section[id]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          onEnter: () => {
            if (wipe.current) gsap.fromTo(wipe.current, { opacity: 0.5 }, { opacity: 0, duration: 0.7, ease: "power2.out" });
          }
        });
      });
      gsap.utils.toArray<HTMLElement>(".max-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 70, opacity: 0.15, scale: 0.97, filter: "blur(8px)" }, {
          y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
        });
      });
    });
    return () => { cancelAnimationFrame(raf); ctx.revert(); };
  }, []);
  return (
    <div aria-hidden="true">
      <div className="cinema-vignette" />
      <div className="cinema-leak" />
      <div ref={wipe} className="pointer-events-none fixed inset-0 z-[120] bg-black opacity-0" />
      <div className="fixed inset-x-0 top-0 z-[110] h-[3px] origin-left bg-gradient-to-r from-electric via-violet to-electric">
        <div ref={bar} className="h-full w-full origin-left bg-gradient-to-r from-electric to-violet" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
