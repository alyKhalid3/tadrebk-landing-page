# Tadreebak — Premium Landing Page (v2)

Egypt's first platform connecting university students with internships. This is the
redesigned public landing page (`/`), built as a standalone Next.js app that can be
deployed on its own (e.g. Vercel project `tadrebk-landing`) while all product CTAs
deep-link into the main app.

## Run it

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Stack

| Layer      | Choice                                    | Why                                              |
| ---------- | ----------------------------------------- | ------------------------------------------------ |
| Framework  | Next.js 14 (App Router, RSC)              | Everything except the 3D is server-rendered      |
| 3D         | React Three Fiber + three (lazy chunk)    | Procedural low-poly geometry, no external assets |
| Scroll     | Lenis (smooth) + GSAP ScrollTrigger       | Single rAF ticker drives both                    |
| UI motion  | CSS transitions/keyframes                 | Hover + micro-interactions cost 0 KB of JS       |
| Fonts      | `next/font` (Plus Jakarta Sans 800 + Inter 400/500/600) | Self-hosted, `display: swap`, preloaded |
| Analytics  | none wired                                | Add Plausible `<script defer>` — never GTM       |

## Page story

1. **Hero** — eyebrow, gradient H1 with word stagger, glass search card (live-filters
   the Featured section below), quick tags, university trust strip, scroll cue.
2. **Hero 3D** — a low-poly graduation cap + 26-instance icosahedron "career lattice"
   drifting behind the copy, cursor-parallax camera (lerp 0.08), canvas fades out over
   the first 260px of scroll.
3. **Audience split** — For Students (ink-900) / For Companies (emerald), hover tilt,
   plus a product-facts band (real capabilities only — no invented metrics).
4. **Featured internships** — search + location filters (shared store with the hero,
   `aria-live` result count), cursor-parallax cards, green top-border hover.
5. **Browse by category** — 6 colored tiles, pop-in stagger, one-shot 360° tile spin.
6. **How it works** — 6 steps, timeline line draws itself (scaleY scrub), ghost numbers.
7. **Dashboard preview** — dark chapter, mockup flies in at rotateY −25° → −8°, ±1° idle.
8. **Why Tadreebak** — horizontal marquee of real platform capabilities, pauses on hover.
9. **CTA band** — emerald, grain texture, CSS torus rings.
10. **Footer** — 4 columns, white logo variant, socials, Arabic made-in line (RTL-ready copy).

## Brand lock

Tokens live in `app/globals.css` (`:root`) and are exposed to JS via CSS variables:
`--brand-green-500 #10B981`, `--ink-900 #0B1220`, mint scale, Inter/Plus Jakarta Sans.
Logo asset: `public/images/logoandfav.png` (header 44px → 36px scrolled; footer uses a
CSS `brightness(0) invert(1)` white variant). Never animate the logo geometry.

## Performance decisions (budget: <220 KB first-load JS, LCP < 1.8s, CLS < 0.05)

- The 3D scene is its own chunk via `next/dynamic({ ssr: false })`, mounted on
  `requestIdleCallback` after hydration, only when WebGL exists and motion is allowed.
- `frameloop="demand"` + an active flag (hero visibility + tab visibility): the render
  loop sleeps when the hero scrolls out. DPR capped at [1, 1.5], antialias off,
  instanced geometry, no shadows, no postprocessing.
- **Drei was intentionally skipped** — the two helpers it would provide (AdaptiveDpr,
  BakeShadows) aren't needed since there are no shadows and DPR is set once; this keeps
  the 3D chunk lean.
- **Framer Motion was intentionally skipped** — every hover/micro-interaction is CSS,
  which is cheaper and respects the motion budget.
- Reveal animations use a `.js` class gate: content is visible without JS and for
  `prefers-reduced-motion` users; no FOUC, no stuck-invisible content.
- Service worker (`public/sw.js`) caches only immutable `/_next/static/*` and
  `/images/*` — never pages or RSC payloads.
- Hero canvas sits in a fixed-inset container → zero layout shift.

## Connecting to the main app

CTA/nav deep links are built with `appLink()` in `lib/app-url.ts`:

```bash
NEXT_PUBLIC_APP_URL=https://tadrebk.vercel.app   # default
NEXT_PUBLIC_SITE_URL=https://tadreebak.com       # canonical/OG/sitemap base
```

Mock data (featured internships only) is marked in each component and ready to be
swapped for API data. Stats/testimonial-style content is deliberately factual —
no fabricated numbers or people.

## Accessibility

- Skip-to-content link, visible 2px emerald focus rings, ≥44px touch targets.
- `aria-live="polite"` search result count; decorative 3D/dashboard are `aria-hidden` /
  `role="img"` with labels; marquee clone is `aria-hidden`.
- `prefers-reduced-motion`: no Lenis, no 3D, no GSAP — static gradient + fades only
  (forced by the inline head script + CSS overrides).

## Not included (per deliverables checklist, need human/tooling step)

- Figma file (design source lives in the brief)
- Storybook entries (components are small and colocated in `components/`)
- Lighthouse CI wiring — `lighthouserc.json` is ready for `@lhci/cli` in CI
- OG image is generated at the edge via `app/opengraph-image.tsx` (regenerate design there)
