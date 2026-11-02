export const site = {
  name: "Ibrahim Khalil Ullah",
  role: "SEO Strategist × Full Stack Developer",
  tagline: "Visibility that compounds. Products that ship.",
  location: "Chattogram, Bangladesh",
  phoneDisplay: "+880 1728 057536",
  phoneHref: "tel:+8801728057536",
  email: "ibrahimkhalilullah534@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ibrahimkhalilullah.vercel.app",
  heroTitle: ["IBRAHIM", "KHALIL", "ULLAH"],
  heroSubtitle: "SEO Strategist × Full Stack Developer",
  heroIntro:
    "I turn search demand into revenue and ideas into working software. Strategy first, then structure, then code, then measurable growth."
};

export const assembly = {
  eyebrow: "The Assembly",
  title: "Strategy. Structure. Code. Growth.",
  caption:
    "Scroll and watch one result come together. A ranking climbs, a product compiles, and growth lands on top.",
  steps: [
    { stage: "Strategy", rank: "#10 to #7", text: "Search intent mapped to pages people actually need." },
    { stage: "Structure", rank: "#7 to #4", text: "Clean architecture, fast pages, and content with a clear job." },
    { stage: "Code", rank: "#4 to #2", text: "HTML, CSS, React, API, and database layers build in order." },
    { stage: "Growth", rank: "#2 to #1", text: "Traffic, conversions, and backlinks arrive as proof, not promises." }
  ],
  layers: ["HTML", "CSS", "React", "API", "Database"],
  toppings: [
    { label: "Traffic", value: "Climbing" },
    { label: "Conversions", value: "Tracked" },
    { label: "Backlinks", value: "Earned" }
  ]
};

export const about = {
  eyebrow: "About",
  title: "Calm strategy. Sharp execution.",
  objective:
    "Detail oriented SEO and Outreach Expert and Full Stack Web Developer with 1.5 plus years of combined experience in SEO and outreach and 1 plus year of experience in full stack web development and software engineering.",
  summary:
    "Seeking a challenging role where SEO strategy, technical optimisation, web application development, and problem solving improve digital visibility, user experience, and business growth.",
  detail:
    "Skilled in on page, off page, and technical SEO, keyword research, competitor analysis, link building and outreach, Google Ads and Meta Ads, analytics and conversion tracking, and web development using HTML, CSS, JavaScript, React.js, MongoDB, Express.js, and n8n. Data driven, results oriented, and comfortable working across marketing and technical teams.",
  photoAlt: "Portrait placeholder for Ibrahim Khalil Ullah",
  photoNote: "Replace public/ibrahim.jpg with a real portrait. Keep the same file name and a portrait crop for the best result."
};

export const skills = {
  eyebrow: "Skills",
  title: "Two crafts. One outcome.",
  marketing: [
    "On Page / Off Page / Technical SEO",
    "Keyword Research and Competitor Analysis",
    "Link Building and Outreach",
    "Google Ads and Meta Ads",
    "Analytics and Conversion Tracking (GA, Search Console)",
    "Business Development and Lead Generation"
  ],
  engineering: [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Node / Express.js",
    "MongoDB",
    "n8n Automation",
    "Advanced MS Office (Excel analytics, automated reporting, PowerPoint, Word)"
  ]
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  featured?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior SEO Specialist",
    company: "Growthx LLC",
    period: "Mar 2025 to Aug 2025",
    featured: true,
    highlights: [
      "On page optimisation and technical crawl fixes",
      "Clean high authority backlinks via outreach",
      "Keyword research and competitor teardowns",
      "Collaboration with marketing teams",
      "Data driven decisions using Analytics and Search Console"
    ]
  },
  {
    role: "Software Engineer Intern, Full Stack Web Development",
    company: "Prayers Connect, New York (Remote)",
    period: "Jan 2024 to Feb 2025",
    highlights: [
      "Built and tested web based applications with the software engineering team",
      "Worked with HTML, CSS, JavaScript, React.js, MongoDB, and Express.js",
      "Supported troubleshooting and backend optimisation"
    ]
  },
  {
    role: "Outreach Specialist",
    company: "Giant Marketer, Cumilla",
    period: "Sep 2020 to Aug 2021",
    highlights: [
      "Built relationships with influencers and bloggers",
      "Planned targeted outreach campaigns for visibility and authority",
      "Used MS Excel for analytics and reporting"
    ]
  }
];

export const metrics = [
  { label: "Organic traffic", value: "+__%", note: "Fill in your verified result here." },
  { label: "Keywords in top positions", value: "__", note: "Fill in your verified result here." },
  { label: "High authority links earned", value: "__", note: "Fill in your verified result here." }
];

export type Project = {
  title: string;
  kind: string;
  description: string;
  url: string;
  gated: boolean;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "School / Madrasha BPM",
    kind: "Production product",
    description: "A business process system for schools and madrashas, built for daily operations, records, and clear reporting.",
    url: "https://school-bpm.vercel.app",
    gated: true,
    tags: ["Product", "Operations", "Web app"]
  },
  {
    title: "School / Madrasha BPM",
    kind: "Demo",
    description: "A guided demo of the school and madrasha workflow, from enrolment to reporting.",
    url: "https://school-bpm-demo.vercel.app",
    gated: true,
    tags: ["Demo", "Education", "Workflow"]
  },
  {
    title: "Vendor Onboarding and Risk BPM",
    kind: "Demo",
    description: "Vendor onboarding with risk checks, structured approvals, and a clear audit trail.",
    url: "https://vendor-bpm-demo.vercel.app",
    gated: true,
    tags: ["Demo", "Vendors", "Risk"]
  },
  {
    title: "RetailMind",
    kind: "Interactive demo",
    description: "An interactive retail demo that turns shop data into decisions a team can act on.",
    url: "https://retailmind-iota.vercel.app",
    gated: false,
    tags: ["Demo", "Retail", "Analytics"]
  },
  {
    title: "Heartbeat",
    kind: "Game",
    description: "A fast, playful browser game with a simple loop and instant feedback.",
    url: "https://heartbeat-luisswift123-6566.vercel.app/play.html",
    gated: false,
    tags: ["Game", "Browser", "Play"]
  },
  {
    title: "The Calm Leash",
    kind: "Book sales page",
    description: "A focused sales page for a book, built to explain the promise, earn trust, and convert.",
    url: "https://the-calm-leash.vercel.app",
    gated: false,
    tags: ["Sales page", "Book", "Conversion"]
  }
];

export const contact = {
  eyebrow: "Contact",
  title: "Let's build something that ranks.",
  intro:
    "Tell me about your market, your product, and the result you need. I will reply with a clear next step, not a generic pitch.",
  services: ["SEO and Outreach", "Full Stack Web Development", "Automation and Reporting", "Paid Ads and Analytics"]
};
