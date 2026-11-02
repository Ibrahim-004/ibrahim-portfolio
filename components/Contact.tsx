"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { contact as contactData, site, type Project } from "@/content/data";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact({ prefill, onPrefillUsed }: { prefill: { subject: string; message: string } | null; onPrefillUsed: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", budget: "", service: "", website: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".contact-title", { y: 70, opacity: 0, scale: 0.96, filter: "blur(10px)" }, {
        y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" }
      });
      gsap.fromTo(".contact-form", { y: 60, opacity: 0, rotateX: -10, transformPerspective: 1000 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 85%" }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!prefill) return;
    setForm((f) => ({ ...f, subject: prefill.subject, message: prefill.message }));
    onPrefillUsed();
  }, [prefill, onPrefillUsed]);

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };
  const magnetic = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `translate(${px * 10}px, ${py * 8}px) scale(1.02)`;
  };
  const magneticOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.website) return;
    if (form.name.trim().length < 2 || !form.email.includes("@") || form.subject.trim().length < 3 || form.message.trim().length < 10) {
      setError("Please check your name, email, subject, and message, then try again.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "The message could not be sent.");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", budget: "", service: "", website: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "The message could not be sent. Please try again.");
    }
  };

  const inputCls = "w-full rounded-xl border border-line bg-ink/70 px-4 py-3.5 text-mist placeholder:text-muted/70 focus:border-violet";
  return (
    <section ref={root} id="contact" className="max-reveal relative overflow-hidden px-6 py-24 md:px-12 md:py-32" aria-label="Contact">
      <div className="glow-pulse pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-violet/20 blur-[120px]" aria-hidden="true" />
      <div className="glow-pulse pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-electric/20 blur-[110px]" style={{ animationDelay: "1.5s" }} aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs tracking-[0.35em] text-muted">CONTACT</p>
          <h2 className="contact-title mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">{contactData.title}</h2>
          <p className="mt-6 max-w-md leading-8 text-muted">{contactData.intro}</p>
          <div className="mt-10 space-y-4">
            <p><span className="text-muted">Phone: </span><a href={site.phoneHref} className="font-semibold underline-offset-4 hover:underline">{site.phoneDisplay}</a></p>
            <p><span className="text-muted">Email: </span><a href={`mailto:${site.email}`} className="font-semibold underline-offset-4 hover:underline">{site.email}</a></p>
            <p><span className="text-muted">Location: </span><span className="font-semibold">{site.location}</span></p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {contactData.services.map((s) => <span key={s} className="rounded-full border border-line px-4 py-2 text-sm text-muted">{s}</span>)}
          </div>
        </div>
        <form onSubmit={submit} className="contact-form glass rounded-3xl p-6 md:p-8" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm font-semibold">Name *</span><input required value={form.name} onChange={update("name")} className={inputCls} placeholder="Your full name" autoComplete="name" /></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold">Email *</span><input required type="email" value={form.email} onChange={update("email")} className={inputCls} placeholder="you@example.com" autoComplete="email" /></label>
          </div>
          <label className="mt-4 block"><span className="mb-2 block text-sm font-semibold">Subject *</span><input required value={form.subject} onChange={update("subject")} className={inputCls} placeholder="What do you need?" /></label>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm font-semibold">Service type (optional)</span>
              <select value={form.service} onChange={update("service")} className={inputCls}>
                <option value="">Choose a service</option>
                {contactData.services.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="block"><span className="mb-2 block text-sm font-semibold">Budget (optional)</span><input value={form.budget} onChange={update("budget")} className={inputCls} placeholder="e.g. 500 to 1500 USD" /></label>
          </div>
          <label className="mt-4 block"><span className="mb-2 block text-sm font-semibold">Message *</span><textarea required rows={6} value={form.message} onChange={update("message")} className={inputCls} placeholder="Tell me about your goal, timeline, and current site." /></label>
          <label className="hidden" aria-hidden="true"><span>Leave this empty</span><input value={form.website} onChange={update("website")} tabIndex={-1} autoComplete="off" /></label>
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-xl bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200" role="status">✓ Message sent. Thank you. I will reply to your email with a clear next step.</motion.p>
            )}
            {status === "error" && (
              <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200" role="alert">{error} You can also email {site.email} directly.</motion.p>
            )}
          </AnimatePresence>
          <button type="submit" disabled={status === "sending"} onMouseMove={magnetic} onMouseLeave={magneticOut} className="magnetic-btn glow-border mt-6 w-full rounded-full bg-gradient-to-r from-electric to-violet px-7 py-4 text-sm font-bold text-white disabled:opacity-60">
            {status === "sending" ? "Sending, please wait…" : status === "success" ? "Message sent" : "Send message"}
          </button>
          <p className="mt-4 text-center text-xs text-muted">Your details are used only to reply to this enquiry.</p>
        </form>
      </div>
    </section>
  );
}
