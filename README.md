1. Ibrahim Khalil Ullah Portfolio

A cinematic, scroll driven portfolio for an SEO strategist and full stack developer. Scroll is the camera. The hero reveals letter by letter, the Assembly scene pins while a ranking climbs from position 10 to position 1, code layers build in order, and growth metrics land on top.

Motion upgrade, maximum effort: a heavier film layer is now always on. It adds stronger film grain, a vignette, a moving light leak, floating dust across the whole page, a cursor trail on desktop, a gradient scroll progress bar, a black film cut wipe on every section change, infinite marquee strips, a rotating badge in the hero, an animated gradient hero background, 1200 ambient particles, camera zoom and blur in the hero and Assembly, a longer pinned Assembly with a second camera push and flash, magnetic buttons, a spotlight that follows the mouse on project cards, 3D skill chips, glowing metric cards, camera reveals on every main section, and pulsing glow in the closing contact scene. Reduced motion still returns the site to clean static layouts, and mobile gets a lighter dust count.

Best polish pass: project cards now have animated gradient preview visuals, About now shows verified stats and education from the CV, privacy and terms now link back home, and a floating back to top button appears after scrolling. No invented results were added. Only CV facts and placeholder metrics remain clearly marked.

2. What is inside

1. Next.js 14 with App Router and TypeScript
2. Tailwind CSS with a near black palette and an electric blue to violet gradient
3. GSAP and ScrollTrigger for pinned, scrubbed scenes
4. Lenis for smooth inertia scrolling
5. Framer Motion for UI transitions, overlays, and form states
6. React Three Fiber, lazy loaded, for ambient hero particles
7. A contact API with Zod validation, a honeypot field, and rate limiting
8. SEO basics: Metadata API, Open Graph and Twitter cards, JSON LD Person schema, sitemap, robots, and a single H1

3. Quick start

1. Install dependencies: npm install
2. Run locally: npm run dev
3. Open http://localhost:3000 in your browser
4. Build for production: npm run build
5. Start production locally: npm start

4. Contact form setup

The form posts to /api/contact. It needs real values before it can send mail. Secrets stay on the server only and are never sent to the browser.

1. Copy .env.example to .env.local
2. In .env.local, replace each placeholder with your real value:
   1. CONTACT_TO_EMAIL: the inbox that should receive enquiries. Use ibrahimkhalilullah534@gmail.com unless you want a different inbox.
   2. CONTACT_FROM_EMAIL: a verified sender address in Resend, for example onboarding@resend.dev for testing or your own verified domain for production.
   3. RESEND_API_KEY: your Resend API key from resend.com, under API Keys.
3. Optional: set NEXT_PUBLIC_SITE_URL to your live domain, for example https://ibrahimkhalilullah.vercel.app
4. Restart the dev server after changing .env.local
5. Test the form. You should see a success message, receive the enquiry, and the sender should receive an auto reply.
6. If email is not configured, the form shows a clear error and suggests emailing directly. That is intentional, so a missing key never fails silently.

Rate limit note: the API allows 5 requests per hour per IP using in memory tracking. That is enough for a personal portfolio on one server instance. For high traffic production use, replace it with a shared store such as Upstash Redis.

5. Deploy on Vercel

1. Push this folder to GitHub
2. In Vercel, choose New Project and import the repository
3. Keep the defaults. Framework: Next.js. Build command: npm run build.
4. In Project Settings, then Environment Variables, add CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, RESEND_API_KEY, and NEXT_PUBLIC_SITE_URL
5. Deploy. Then redeploy once after adding variables, so the new build picks them up.
6. Test the live contact form and check that the sender receives the auto reply.
7. In Resend, verify your sending domain before using a custom sender address in production.

6. Edit content fast

All copy lives in one file: content/data.ts

1. Name, role, location, phone, and email: edit the site object at the top
2. Assembly captions, layers, and toppings: edit the assembly object
3. About text: edit the about object
4. Skills: edit the marketing and engineering lists
5. Experience: edit the experience list
6. Metrics placeholders: edit the metrics list. Replace +__% and __ with verified figures only.
7. Projects: edit the projects list. Set gated to true for any demo that needs access approval. Gated projects show Request demo access, which prefills the contact form. No login details are stored in this codebase.
8. Contact services: edit the contact object

7. Swap images, videos, and metrics

1. Portrait: replace public/ibrahim.jpg with a real portrait. Keep the same file name and use a portrait crop, ideally 1080 by 1350. Update the alt text in content/data.ts if the description changes.
2. Social card: the same portrait is used for Open Graph and Twitter cards. For a dedicated social image, add public/og.jpg and update the image paths in app/layout.tsx.
3. Videos: for a hero or project video, add an optimised WebM or MP4 under public/media, use muted autoplay with playsInline, add a poster image, and respect prefers reduced motion by showing the poster instead. Keep files small and lazy load anything below the fold.
4. Metrics: replace placeholders in content/data.ts only when you have a verified source, such as Analytics or Search Console. Do not invent a percentage.
5. Project links: update URLs in content/data.ts. Keep gated demos gated, and never add usernames, passwords, or invite codes to the site.

8. Accessibility and performance notes

1. Contrast targets WCAG AA. Headings use tight tracking and generous spacing on an 8 pixel grid.
2. Keyboard users get visible focus states and a skip link to main content.
3. With prefers reduced motion, GSAP pinning and heavy motion are skipped and layouts stay static and readable.
4. On mobile, heavy 3D is simplified. Particles load only on larger screens, and skill panels stack instead of scrolling sideways.
5. For best Lighthouse results, keep images in AVIF or WebP where possible, preload only the hero font, and avoid adding large video files to the first screen.

9. Folder structure

1. app: layout, home page, privacy, terms, sitemap, robots, and the contact API
2. components: Preloader, Cursor, Hero, Assembly, About, Skills, Experience, Projects, Contact, Footer, Particles
3. content: data.ts, the single source for site copy
4. lib: contact.ts, the shared Zod schema for client and server validation
5. public: ibrahim.jpg portrait placeholder

10. Troubleshooting

1. Form shows Email is not configured yet: check .env.local values and restart the dev server, or check Vercel Environment Variables and redeploy.
2. Resend rejects the sender: use a verified domain sender in Resend, or onboarding@resend.dev for testing.
3. Build fails on types: run npm run build locally and fix the first reported file, usually a prop type in a component.
4. Pinning looks wrong after a content change: GSAP ScrollTrigger refreshes on load, but a hard refresh clears any stale pinned state in development.
