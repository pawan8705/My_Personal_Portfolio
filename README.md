# My Personal Portfolio — Developer Portfolio Website

A production-deployed personal portfolio website built with React 19, TypeScript, Tailwind CSS v4, and GSAP. The site is a single-page application with 9 sections — Hero, About, Skills, Projects, Experience, Education, Certifications, Contact, and Footer — each lazy-loaded and animated with a custom `IntersectionObserver`-based reveal system. A fixed progress bar tracks scroll depth, a typewriter cycles through 7 professional titles, and a MarqueeBar of 14 tech stack icons sits between the hero and the rest of the content. The contact form sends real emails via EmailJS with auto-save draft and session-persistent visit tracking. Deployed live on Vercel.

---

## Live Demo

**[https://pawan8705.vercel.app/](https://pawan8705.vercel.app/)**

---

## What This Project Does

The portfolio opens on a full-screen hero card with a 3D tilt effect driven by `requestAnimationFrame` — the card responds to mouse position with `perspective(700px) rotateY(Xdeg) rotateX(Ydeg)`, a conic-gradient glow ring pulses behind the profile image, and a radial spotlight follows the cursor. A typewriter loops through 7 role labels. Below the hero, a marquee strip scrolls 14 tech stack icons infinitely. Every subsequent section (About, Skills, Projects, Experience, Education/Certifications, Contact) loads lazily and reveals via staggered CSS transitions triggered by `IntersectionObserver` — no Framer Motion, no GSAP on these sections. The Projects section has 4-category filter buttons. The Contact form auto-saves drafts to `localStorage` every 700ms (debounced), restores them on next visit, and sends via the EmailJS SDK.

---

## Architecture — Single-Page App, No Router

The entire portfolio is one `App.tsx` file with no React Router. Navigation is section-scroll only — the navbar uses `smoothScroll(id)` which calls `window.scrollTo({ top: el.offsetTop - 5, behavior: "smooth" })`. Each section has an `id` attribute matching the nav link.

```tsx
// App.tsx — section order
<Hero />          // NOT lazy — above fold, loads immediately
<MarqueeBar />    // NOT lazy — immediately below hero
<Suspense><About /></Suspense>
<Suspense><Skills /></Suspense>
<Suspense><Projects /></Suspense>
<Suspense><Experience /></Suspense>
<Suspense><Education /></Suspense>   // also renders <Certifications /> inside
<Suspense><Contact /></Suspense>
<Footer />
```

Each `Suspense` boundary has a `<Skeleton>` fallback that renders animated pulse bars matching the section's approximate layout — 3 header bars + a 3-column card grid.

---

## Theme System — `ThemeContext.tsx`

`ThemeProvider` stores theme as `'dark' | 'light'` in `localStorage`. On mount, reads saved value (defaults to `'dark'`). `useEffect` applies `document.documentElement.setAttribute('data-theme', theme)` on every change. All design tokens are CSS custom properties under `:root` (dark) and `[data-theme="light"]` (light). Toggle is a `() => setTheme(t => t === 'dark' ? 'light' : 'dark')` function.

### Design Tokens — CSS Custom Properties

22 design tokens defined on `:root` (dark) and overridden in `[data-theme="light"]`:

| Token | Dark | Light |
|---|---|---|
| `--bg0` | `#060810` | `#dde2ea` |
| `--bg1` | `#0a0d16` | `#e3e8f0` |
| `--bg2` | `#0f1320` | `#e9eef5` |
| `--bg3` | `#141928` | `#eff3f8` |
| `--bg4` | `#1a2035` | `#f7f9fc` |
| `--text1` | `#eef0f8` | `#080c18` |
| `--text2` | `#8d98b5` | `#4a5370` |
| `--text3` | `#3a4258` | `#8892aa` |
| `--accent` | `#6366f1` | `#6366f1` |
| `--accent-h` | `#818cf8` | `#818cf8` |
| `--accent-glow` | `rgba(99,102,241,0.35)` | `rgba(99,102,241,0.4)` |
| `--green` | `#10d9a0` | `#10d9a0` |
| `--border` | `rgba(255,255,255,0.055)` | `rgba(0,0,0,0.07)` |
| `--sh-d` | `rgba(0,0,0,0.8)` | `rgba(150,165,185,0.55)` |
| `--sh-l` | `rgba(255,255,255,0.035)` | `rgba(255,255,255,0.95)` |
| `--neu-out` | 6px 6px 20px sh-d, -3px -3px 10px sh-l | (same tokens) |

Neuromorphic shadows (`--neu-out`, `--neu-out-sm`, `--neu-in`, `--neu-in-sm`) are pre-computed as CSS variables and applied via `style={{ boxShadow: "var(--neu-out)" }}` — making the entire card system theme-aware with zero JavaScript.

---

## Custom Hooks — `src/hooks/index.ts`

6 custom hooks, all TypeScript-typed:

| Hook | Purpose | Implementation |
|---|---|---|
| `useCSSReveal(selector, rootRef?)` | Adds `.in` class to matching elements on viewport entry | Single `IntersectionObserver`, `io.unobserve` after first trigger |
| `useInView(opts?)` | Returns `[ref, inView]` boolean | Single `IntersectionObserver` with configurable threshold + margin |
| `useScrollY()` | Current `window.scrollY` | RAF-throttled with `ticking` ref — no redundant renders |
| `useScrollProgress()` | Scroll completion ratio 0–1 | `scrollY / (scrollHeight − innerHeight)`, RAF-throttled |
| `useActiveSection(ids[])` | Active section ID | Array of `IntersectionObserver`s on each section element (threshold 0.25, rootMargin `-20% 0px -60% 0px`) |
| `useTyped(phrases, options?)` | Typewriter effect string | State machine: `pi` (phrase index), `ci` (char index), `del` (deleting), `paused` — `setTimeout`-driven, configurable `typeSpeed`, `deleteSpeed`, `pauseMs` |

---

## Scroll Progress Bar

`ProgressBar` renders as a `fixed top-0 left-0 z-[300] h-[3px]` div. Width is `${p * 100}%` where `p` comes from `useScrollProgress()`. Background: `linear-gradient(90deg, var(--accent), var(--accent-h), var(--green))`. Box-shadow: `0 0 10px var(--accent-glow)`. Transition: `width 0.1s linear`. The RAF-throttled hook ensures the DOM updates never block the main thread.

---

## Navbar — `Navbar.tsx`

7 navigation links (Home, About, Skills, Projects, Experience, Education, Contact). Active section tracked by a local `useActiveSection` in the Navbar — reads `Math.abs(el.getBoundingClientRect().top - 80)` for each section and picks the closest one. Active link style: `background: var(--bg3), box-shadow: var(--neu-in-sm), color: var(--accent)`. `navSlideDown` keyframe slides the nav in on load: `translateY(-80px) → translateY(0)`. Scroll-aware background: `rgba(6,8,16,0.94)` (dark) / `rgba(220,226,235,0.94)` (light) with `backdrop-filter: blur(28px) saturate(2)` at `scrollY > 50`.

Mobile menu (`open` state): animated with `mobileMenuIn` keyframe — `translateY(-20px) scale(0.95) → translateY(0) scale(1)`. `backdropIn` keyframe fades in the backdrop overlay. `nudgeRight` keyframe on mobile link hover animates `translateX(4px)`.

---

## Hero Section — `Hero.tsx`

### Typewriter

Local `useTypewriter` hook (separate from `useTyped` in hooks): `text`, `idx`, `del` state. `setTimeout` with `speed / 2` for delete speed. Cycles through 7 `phrases` from `data/index.ts` — "Frontend Developer", "React.js Specialist", "UI/UX Enthusiast", "JavaScript Aficionado", "AI Tools Explorer", "Tailwind CSS Expert", "Open Source Contributor".

### 3D Tilt + Spotlight

`onMouseMove` on the hero card uses `requestAnimationFrame` (via `rafRef`) to throttle DOM writes:

```ts
const dx = (x - rect.width / 2) / (rect.width / 2);
const dy = (y - rect.height / 2) / (rect.height / 2);
el.style.transform = `perspective(700px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translate3d(0,0,0)`;
el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
```

`--mx` and `--my` feed the `.spotlight` pseudo-element: `radial-gradient(300px circle at var(--mx) var(--my), rgba(255,255,255,0.07), transparent 70%)`. Opacity transitions 0→1 on hover, 1→0 on leave. `onMouseLeave` resets transform to flat and cancels any pending RAF.

### Conic Glow Ring

`.hero-card-glow` is a `conic-gradient(from 0deg, transparent 20%, var(--accent) 40%, var(--green) 60%, transparent 80%)` positioned `inset: -1px` behind the card (z-index: 0). Animates with `glowPulse` — `opacity: 0.5 → 1.0` on a 3s ease-in-out loop.

### Hero Content

Left column: status badge ("Available" — green pulse dot), name ("Pawan Tripathi") with `hero-card-name` fade-up animation, typewriter line with blinking cursor, bio text, 3 stats (75+ Projects, 65+ Repositories, 25+ Technologies), 7 social icon links, 2 CTA buttons (View My Work scrolls to `#projects`, Resume Download links to Google Drive).

Right column: profile photo with `about-card-img img:hover { transform: scale(1.05) }` and the glow ring + spotlight system. All social icons dynamically map from `data/socials` array using a `SOCIAL_ICONS` Record that maps icon name strings to react-icons components.

---

## MarqueeBar — `MarqueeBar.tsx`

14 tech stack items: React.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, Vite, Redux, MongoDB, GitHub, Firebase, JavaScript, CSS3, HTML5, Git. Each rendered with its corresponding react-icons icon (`FaReact`, `SiTypescript`, `SiTailwindcss`, etc.). The array is doubled (`[...SKILLS, ...SKILLS]`) and the `.marquee-track` CSS class applies a `translateX(-50%)` keyframe animation — because the content is doubled, when it reaches 50% it visually loops back to the start seamlessly. Icon color: `var(--green)`. Label style: `text-[11px] font-bold tracking-[0.18em] text-[var(--text3)]`.

---

## Skills Section — `Skills.tsx`

6 skill category cards in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`). Each card (`sk-card`) has:

- A 3px color-keyed top border: `linear-gradient(90deg, cat.color, cat.color + "55")`
- A neuromorphic icon container: `linear-gradient(145deg, var(--bg3), var(--bg2))` + `var(--neu-in-sm)` shadow
- A skill count badge (top-right)
- Skill pills: each `px-3 py-1.5 rounded-xl text-[11px]` with neumorphic background

`useReveal()` inside Skills.tsx runs a local `IntersectionObserver` on `.sk-card` elements — adds `.in` class on entry. `.sk-card.in:hover { transform: translate3d(0,-6px,0) }`. Each card delays via `--rv-d: ${index * 55}ms`.

6 categories and their skill counts:

| Category | Skills Count |
|---|---|
| Frontend Core | 6 |
| React Ecosystem | 8 |
| Styling & UI | 8 |
| Tools & Platforms | 8 |
| Backend & Services | 4 |
| AI Dev Tools | 8 |

---

## Projects Section — `Projects.tsx`

8 projects from `data/index.ts`. 4 filter categories: All, Frontend, E-Commerce, AI Project. Active filter button: `linear-gradient(135deg, var(--accent), var(--accent-h))` + `box-shadow: 0 4px 18px var(--accent-glow)`. Inactive: neuromorphic pill.

Each project card (`pj-card`):

- CSS-only reveal: `opacity:0; transform:translate3d(0,20px,0)` → `.in { opacity:1; transform:translate3d(0,0,0) }` with `transition: 0.5s ease var(--pj-d)` (stagger via `--pj-d` CSS variable)
- 3px color-keyed top border matching `p.color`
- Emoji icon in neuromorphic box
- Title + category badge
- Description text
- Tech stack pills (each as a small pill tag)
- GitHub icon link + live demo link button (`.pj-btn` hover: `opacity 0.82, translateY(-1px)`)
- Featured badge for 4 of 8 projects

Projects showcased:

1. Personal Portfolio (Frontend, featured)
2. Doctor Appointment Booking App (Frontend, featured)
3. Nova Shop (E-Commerce, featured)
4. Admin Dashboard (AI Project)
5. Bella Vista Restaurant (AI Project)
6. Expense Tracker (AI Project)
7. Nike Landing Page (Frontend)
8. Projects Showcase Website (Frontend, featured)

---

## Experience Section — `Experience.tsx`

Timeline layout: `pl-10 sm:pl-14 md:pl-16` left padding with a 2px gradient timeline line (`var(--accent) → var(--accent-h) → transparent`). Each entry (`exp-rv`) reveals from `translateX(-24px)` to `translateX(0)` with `--exp-d` stagger delay (80ms × index). On hover: `.exp-inner { transform: translate3d(4px, 0, 0) }`.

Timeline dot: positioned absolutely `-left-[42px sm:-52px md:-56px]`, gradient background, `box-shadow: 0 0 0 3px var(--bg1), 0 0 16px var(--accent-glow)` ring effect. Icon mapped from `ICONS` record by `exp.type`.

1 experience entry:

- **Frontend Developer** at Tripathi Dev Lab — 2025 – Present (current)
- Type: Self-Initiative
- Tags: JavaScript, TypeScript, React.js, GSAP, Framer Motion, AI Tools

---

## Education Section — `Education.tsx`

Same timeline layout as Experience but using a green gradient (`var(--green) → var(--accent-h) → transparent`). Each entry (`edu-rv`) reveals from `translateX(24px)` — opposite direction to experience. 3 education entries with `EDU_ICONS = ["🎓", "🏅", "📚"]`:

1. BCA — MAHGU, 2022–2025, 8.03 CGPA, 5 course tags
2. Intermediate (12th PCM) — Rana Pratap Inter College, 2021–2022, 74%
3. High School (10th) — Guru Nanak Public School, 2019–2020, 79%

`Education` also renders `<Certifications />` as the last child inside its `<section>` element — sharing the same page section.

---

## Certifications Section — `Certifications.tsx`

3-column grid. Each card (`cert-rv`) reveals from `translateY(18px)` with `--cert-d` stagger (60ms × index). On hover: `translateY(-6px)`. Each card has a color-keyed top border with `box-shadow: 0 0 10px ${c.color}44` glow. `View Certificate` link opens in new tab.

1 certifications:

- **JavaScript — The Complete Guide** — CodeChef, 2024

---

## Contact Section — `Contact.tsx`

### EmailJS Integration

`emailjs.send("service_n6ghdki", "template_piwiz6w", params)` sends real emails with fields: `name`, `email`, `title` (subject or "No Subject"), `message`, `time` (formatted locale string).

### Auto-Save Draft

`store.draft.save(u)` is called 700ms after every keystroke (debounced via `timer.current = setTimeout`). On mount, `store.draft.get()` restores any saved draft — shows a "💾 Draft restored" note for 2.8 seconds. On successful submit, `store.draft.clear()` removes the draft.

### Form State Machine

`done` (boolean) — replaces form with a success confirmation card. `sending` (boolean) — disables the submit button and shows a loading indicator. `note` (string) — shows "✅ Auto-saved" for 1.8s after each save, or "💾 Draft restored" on load.

### Validation

3 required fields: name (non-empty), email (regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), message (non-empty). Errors clear per-field as the user types. Submit blocked if any error exists.

`useInView` hook triggers `inView` state — used for reveal animation (opacity + translateY transition) on the section.

---

## `store.ts` — localStorage Utility

Namespaced under `'pt_'` prefix. Type-safe generic `get<T>(key, fallback)` with `try/catch`. 4 methods:

- `store.get<T>(key, fallback)` — parsed JSON read
- `store.set(key, value)` — JSON stringify write
- `store.rm(key)` — remove item
- `store.visits()` — increments visit counter, saves last-visit ISO timestamp
- `store.draft.save(d)`, `store.draft.get()`, `store.draft.clear()` — contact form draft management
- `store.submit(d)` — appends submission to array with timestamp

---

## Footer + ScrollToTop — `Footer.tsx`

Footer: brand name, bio, 7 social icon links (with per-icon `color` on hover via `onMouseEnter/Leave`), quick nav links (react-scroll `<Link>` components), copyright.

`ScrollToTop` component: visible only when `scrollY > 400`. A `40×40px` circular button at `fixed bottom-6 right-6 z-[200]`. An SVG `<circle>` with `strokeDashoffset` computed from `useScrollProgress()` creates a circular progress ring around the button: `circumference × (1 - progress)` where `circumference = 2π × 18`. Enters with `fadeInScale` keyframe: `scale(0.4) → scale(1)`.

---

## Data File — `src/data/index.ts`

Central data module. All section content is declared here and imported by components — nothing is hardcoded in JSX:

| Export | Type | Content |
|---|---|---|
| `personal` | Object | name, role, location, email, phone, bio, Aboutbio, status, Status |
| `Resume` | Object | Google Drive link to resume PDF |
| `phrases` | String[] | 7 typewriter phrases |
| `socials` | Object[] | 7 social links (name, icon string, url, color hex) |
| `stats` | Object[] | 3 hero stats (75+ Projects, 65+ Repos, 25+ Tech) |
| `skillCategories` | Object[] | 6 categories with skills arrays (total 42 skills) |
| `projects` | Object[] | 8 projects (id, emoji, title, cat, featured, desc, tech[], github, live, color) |
| `projectCats` | String[] | ["All", "Frontend", "E-Commerce", "AI Project"] |
| `experience` | Object[] | 1 experience entry |
| `education` | Object[] | 3 education entries |
| `certifications` | Object[] | 1 certification entry |

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19.2.5 | UI framework |
| TypeScript | 6.0.2 | Full type safety across all components and hooks |
| Vite | 8.0.10 | Build tool (with `terser` for production minification) |
| Tailwind CSS | 4.2.4 | Utility-first styling |
| GSAP + @gsap/react | 3.15.0 + 2.1.2 | Animation library (configured, available for complex timelines) |
| @emailjs/browser | 4.4.1 | Contact form email delivery (no backend) |
| @radix-ui/react-dialog | 1.1.15 | Accessible dialog primitives |
| @radix-ui/react-tooltip | 1.2.8 | Accessible tooltip primitives |
| react-icons | 5.6.0 | FaGithub, FaLinkedin, FaYoutube, SiTypescript, SiTailwindcss, and 20+ others |
| lucide-react | 1.14.0 | FiSun, FiMoon, FiMenu, FiX, FiArrowRight, FiDownload, FiGithub, FiExternalLink |
| react-scroll | 1.9.3 | Footer nav links — smooth scroll to section IDs |
| @tailwindcss/vite | 4.2.4 | Vite plugin for Tailwind v4 |

---

## Project Structure

```
My_Personal_Portfolio/
├── index.html                          # Vite entry; OG meta tags; favicon
├── vite.config.ts                      # @vitejs/plugin-react + @tailwindcss/vite + terser minification
├── tsconfig.json / tsconfig.app.json   # TypeScript config — strict mode
├── public/
│   └── robots.txt                      # Search engine directives
│
└── src/
    ├── main.tsx                        # createRoot — mounts <App />
    ├── App.tsx                         # ThemeProvider wraps Inner; ProgressBar (scroll depth bar); Navbar; Hero (eager); MarqueeBar (eager); 6 lazy Suspense sections; Footer + ScrollToTop
    ├── index.css                       # Tailwind v4; 22 CSS custom property design tokens (dark + light); neuromorphic shadow variables; g-text gradient class; marquee-track animation; section-wrap utility; skill-pill + rv (reveal) base styles; marquee keyframe; ::selection accent color
    │
    ├── context/
    │   └── ThemeContext.tsx            # ThemeProvider — localStorage init, data-theme attribute toggle, toggle() function; useTheme() hook
    │
    ├── data/
    │   └── index.ts                    # All portfolio data: personal info, Resume link, phrases (7), socials (7), stats (3), skillCategories (6, 42 total skills), projects (8), projectCats (4), experience (1), education (3), certifications (1)
    │
    ├── hooks/
    │   └── index.ts                    # useCSSReveal (IntersectionObserver + class add); useInView (ref + boolean); useScrollY (RAF-throttled); useScrollProgress (ratio 0–1, RAF-throttled); useActiveSection (array of observers); useTyped (full typewriter state machine)
    │
    ├── utils/
    │   └── store.ts                    # localStorage utility — namespaced 'pt_' prefix; get<T>/set/rm; visits counter; draft.save/get/clear; submit (append with timestamp)
    │
    ├── assets/
    │   ├── Hero.webp                   # Profile photo (hero section)
    │   └── About.webp                  # Profile photo (about section, different crop/pose)
    │
    └── components/
        ├── layout/
        │   ├── Navbar.tsx              # 7 nav links; local useActiveSection (offset-based); smoothScroll(id); navSlideDown keyframe; scroll-aware backdrop-blur; theme toggle (FiSun/FiMoon); mobile menu (mobileMenuIn + backdropIn keyframes)
        │   └── Footer.tsx              # SocialIcon component (icon map + onMouseEnter/Leave color); ScrollToTop (SVG ring progress, fadeInScale keyframe, visible at scrollY>400); react-scroll Links for nav; copyright
        │
        ├── ui/
        │   ├── Loader.tsx              # PT initials spinner with 2 counter-rotating rings (spinCW + spinCCW keyframes) + progress bar; 0→60→100% over 550ms; currently disabled (commented out in App.tsx)
        │   └── MarqueeBar.tsx          # 14 tech icons doubled for seamless loop; marquee-track CSS animation; green icon color + muted label text
        │
        └── sections/
            ├── Hero.tsx                # Local useTypewriter; RAF-throttled 3D tilt (perspective 700px, ±6deg); conic glow ring (glowPulse 3s); radial spotlight (--mx, --my CSS vars); profile image scale-1.05 hover; 3 stats; 7 social icons (SOCIAL_ICONS record map); 2 CTA buttons
            ├── About.tsx               # 2-col grid (image card + bio text); same 3D tilt + spotlight on image card; aboutGlowPulse ring; Aboutbio from data; social icon row
            ├── Skills.tsx              # 6 sk-card; local useReveal IntersectionObserver; color-keyed top border; neuromorphic icon box + skill count badge; skill pills; 55ms stagger via --rv-d
            ├── Projects.tsx            # 8 project cards; 4-category filter (useState active); pj-card CSS reveal (translateY 20px, 0.5s, var(--pj-d) delay); color top border; tech pills; GitHub + live links; featured badge
            ├── Experience.tsx          # Timeline (gradient vertical line); 1 entry; exp-rv reveal from translateX(-24px); timeline dot with glow ring; exp-inner hover nudge; ICONS record for type icons; 80ms stagger
            ├── Education.tsx           # Timeline (green gradient line); 3 entries; edu-rv reveal from translateX(24px); 80ms stagger; grade badge; tags pills; renders <Certifications /> as last child
            ├── Certifications.tsx      # 3-col grid; 1 cert card; cert-rv reveal from translateY(18px); color glow top border; neuromorphic icon box; "View Certificate" link
            └── Contact.tsx             # emailjs.send() with real credentials; useInView for section reveal; store.draft auto-save (700ms debounce); draft restore on mount; 4-field form (name, email, subject, message); validate() with per-field error clear; done/sending/note states; section reveal animation via inView
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An EmailJS account (service ID, template ID, public key) for the contact form

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tripathipawan/My_Personal_Portfolio.git
cd My_Personal_Portfolio

# 2. Install dependencies
npm install

# 3. Configure EmailJS
# In src/components/sections/Contact.tsx, update:
# emailjs.send("your_service_id", "your_template_id", params)
# and pass your public key to emailjs.init() or sendForm()

# 4. Start the development server
npm run dev
# App runs at http://localhost:5173
```

### Build

```bash
npm run build     # tsc -b (TypeScript check) + vite build (with terser minification)
npm run preview   # Preview the production build
```

---

## Repository

[https://github.com/tripathipawan/My_Personal_Portfolio](https://github.com/tripathipawan/My_Personal_Portfolio)
