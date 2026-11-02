import Link from "next/link";
import { site } from "@/content/data";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 md:px-12" aria-label="Footer">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display font-bold">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.role}</p>
        </div>
        <nav className="flex gap-6 text-sm" aria-label="Legal">
          <Link href="/privacy" className="text-muted hover:text-white">Privacy</Link>
          <Link href="/terms" className="text-muted hover:text-white">Terms</Link>
          <a href="#contact" className="text-muted hover:text-white">Contact</a>
        </nav>
        <p className="text-sm text-muted">© 2026 Ibrahim Khalil Ullah. All rights reserved.</p>
      </div>
    </footer>
  );
}
