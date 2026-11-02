"use client";
import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import Cinematic from "@/components/Cinematic";
import Dust from "@/components/Dust";
import Marquee from "@/components/Marquee";
import Cursor from "@/components/Cursor";
import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import Assembly from "@/components/Assembly";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site, type Project } from "@/content/data";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [prefill, setPrefill] = useState<{ subject: string; message: string } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1.05 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -20 });
    };
    document.addEventListener("click", onAnchor);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); document.removeEventListener("click", onAnchor); };
  }, []);

  const requestAccess = useCallback((project: Project) => {
    setPrefill({
      subject: `Request demo access: ${project.title} (${project.kind})`,
      message: `Hello Ibrahim, I would like demo access for ${project.title} (${project.kind}).\n\nMy goal is:\nMy timeline is:\n\nPlease share the next step.`
    });
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const clearPrefill = useCallback(() => setPrefill(null), []);

  return (
    <>
      <Preloader onDone={() => setStarted(true)} />
      <Cinematic />
      <Dust />
      <Cursor />
      <BackToTop />
      <header className="fixed inset-x-0 top-0 z-[100]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12" aria-label="Main">
          <a href="#" className="font-display text-lg font-bold tracking-tight">IK<span className="text-gradient">U</span></a>
          <div className="hidden items-center gap-7 text-sm text-muted md:flex">
            <a href="#assembly" className="hover:text-white">Assembly</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#projects" className="hover:text-white">Projects</a>
          </div>
          <a href="#contact" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">Contact</a>
        </nav>
      </header>
      <main id="main">
        <Hero started={started} />
        <Marquee />
        <Assembly />
        <About />
        <Skills />
        <Experience />
        <Projects onRequestAccess={requestAccess} />
        <Marquee reverse />
        <Contact prefill={prefill} onPrefillUsed={clearPrefill} />
      </main>
      <Footer />
      <p className="sr-only">{site.name}, {site.role}, based in {site.location}.</p>
    </>
  );
}
