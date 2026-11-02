import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/data";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: "Ibrahim Khalil Ullah | SEO Strategist and Full Stack Developer",
  description:
    "Ibrahim Khalil Ullah helps brands rank, convert, and ship. SEO strategy, outreach, and full stack web development from Chattogram, Bangladesh.",
  keywords: ["Ibrahim Khalil Ullah", "SEO Strategist", "Full Stack Developer", "Outreach Expert", "Chattogram", "Bangladesh"],
  authors: [{ name: site.name }],
  creator: site.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.siteUrl,
    title: "Ibrahim Khalil Ullah | SEO Strategist and Full Stack Developer",
    description: "Find the demand. Build the proof. Grow the result. A portfolio built to rank and to ship.",
    siteName: site.name,
    images: [{ url: "/ibrahim.jpg", width: 1080, height: 1350, alt: "Portrait of Ibrahim Khalil Ullah" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Khalil Ullah | SEO Strategist and Full Stack Developer",
    description: "Find the demand. Build the proof. Grow the result.",
    images: ["/ibrahim.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "SEO Strategist and Full Stack Developer",
    address: { "@type": "PostalAddress", addressLocality: "Chattogram", addressCountry: "BD" },
    email: site.email,
    telephone: "+8801728057536",
    url: site.siteUrl,
    sameAs: []
  };
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('portfolio-theme');if(t==='day'||t==='night')document.documentElement.dataset.theme=t}catch(e){}" }} />
      </head>
      <body className="grain bg-ink text-mist antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-black">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
