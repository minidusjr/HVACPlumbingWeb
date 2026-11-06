<div align="center">

# Lone Star Flow Plumbing: Lead-Generation Website

**A mobile-first, configuration-driven lead-generation site for HVAC and plumbing businesses.**
Change one JSON file to launch a new client site.

[**Live Demo**](https://hvac-plumbing-web.vercel.app) · [Report a Bug](https://github.com/minidusjr/HVACPlumbingWeb/issues)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

</div>
---

## Overview

Local service businesses need a fast page that turns visitors into phone calls and form submissions. This project is a single-page template built for that goal. It has a click-to-call header, a hero with trust badges, a services grid, customer reviews and a lead capture form.

The main design decision is a **configuration-driven UI**. Business data never appears in the components. All text, contact details, services, reviews, SEO metadata and brand colors live in one typed file, [`config/data.json`](./config/data.json).

## Features

- **Configuration-driven UI**: no hardcoded business data in components, all of it flows from `config/data.json`.
- **One-line theming**: change a hex value in the `theme` block and the whole site re-themes, including Tailwind opacity utilities such as `bg-brand-primary/20`.
- **Mobile-first**: tested at iPhone Pro widths. The navbar call button collapses to an icon on phones, the reviews become a swipeable carousel, and form inputs are 16px so iOS Safari doesn't zoom.
- **Performance**
  - The navbar is a zero-JS Server Component, using a native `<details>` element for the mobile menu.
  - The lead form is the only hydrated client island.
  - Critical CSS is inlined, and the LCP hero image is preloaded with `fetchPriority="high"`.
  - `lucide-react` imports are optimised with `optimizePackageImports`.
- **Accessibility**: WCAG 2.1 AA colour contrast, a skip link, semantic landmarks, and properly labelled form fields.
- **Local SEO**: Schema.org `Plumber` JSON-LD, Open Graph and Twitter metadata, and a canonical URL. `sitemap.xml`, `robots.txt` and `manifest.webmanifest` are generated at build time.
- **Lead capture**: posts to the EmailJS REST API, with a Web3Forms fallback, a honeypot spam field and an error state that tells users to call instead.
- **Analytics**: Vercel Analytics and Speed Insights.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16 (App Router), React 18 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4, RGB-channel CSS variable theming |
| Icons | Lucide React |
| Forms | EmailJS REST API (Web3Forms fallback) |
| Hosting | Vercel (CI/CD from GitHub) |

## Architecture

```text
.
├── app/
│   ├── layout.tsx          # Theme injection, SEO metadata, JSON-LD, analytics
│   ├── page.tsx            # Assembles sections from config data
│   ├── globals.css         # Tailwind layers and fallback theme variables
│   ├── sitemap.ts          # Generated /sitemap.xml
│   ├── robots.ts           # Generated /robots.txt
│   └── manifest.ts         # Generated web app manifest
├── components/
│   ├── Navbar.tsx          # Sticky header, click-to-call, zero-JS mobile menu
│   ├── Hero.tsx            # H1, CTAs, trust badges, preloaded LCP image
│   ├── ServicesGrid.tsx    # Services mapped from config
│   ├── Testimonials.tsx    # Reviews mapped from config
│   ├── LeadForm.tsx        # Server shell for the lead section
│   ├── LeadFormClient.tsx  # Client island: form state and submission
│   ├── Footer.tsx          # Contact info and service areas
│   ├── IconRenderer.tsx    # Maps icon names in JSON to Lucide icons
│   └── ui/                 # Reusable Button, Badge, Container, FormField, ...
├── config/data.json        # Single source of truth for all content and theme
├── types/index.ts          # Strict interfaces for every data model
└── lib/                    # cn() helper and hex-to-RGB theme utility
```

**Design principles**

- **Single responsibility**: each section component renders one concern, and shared UI lives in `components/ui/`.
- **Dependency inversion**: components depend on the interfaces in `types/index.ts`, not on the shape of the JSON file.
- **Open/closed**: adding a service, review or nav item only needs a JSON edit.

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm

### Installation

```bash
git clone https://github.com/minidusjr/HVACPlumbingWeb.git
cd HVACPlumbingWeb
npm install
```

### Environment variables

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for canonical URLs, the sitemap and robots.txt |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Optional alternative to EmailJS |

Your EmailJS template can use these variables: `{{name}}`, `{{phone}}`, `{{zip_code}}`, `{{service_needed}}`, `{{business_name}}` and `{{subject}}`.

### Run it

```bash
npm run dev        # development server at http://localhost:3000
npm run typecheck  # TypeScript check
npm run build      # production build
npm run start      # serve the production build
```

## Customising for a New Client

1. Open [`config/data.json`](./config/data.json).
2. Edit the sections you need:

| Section | Controls |
| :--- | :--- |
| `seo` | Page title, description, keywords |
| `theme` | Brand hex colors: `primary`, `primaryHover`, `secondary`, `accent` |
| `business` | Name, phone, email, address, license, hours, navigation |
| `hero` | Headline, subheadline, CTAs, trust badges, hero image |
| `services` | Section copy and service cards |
| `testimonials` | Section copy and reviews |
| `leadForm` | Headings, labels, placeholders, highlights |
| `footer` | Description, service areas, copyright |

3. Replace `public/hero-plumber.svg` with the client's image, or point `hero.image.src` at another file. Next.js optimises raster images and serves SVGs directly.
4. Choose theme colors that keep at least a **4.5:1** contrast ratio against white. The default `#0369a1` primary passes WCAG AA.

## Deployment

The project is set up for [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy. Every push to `main` redeploys automatically.

## Performance and Accessibility Notes

Run Lighthouse in an incognito window, in both Mobile and Desktop modes, to check your own deployment. Results depend on the deployed environment and network conditions.

## Author

**Minidu Sathsara**
GitHub: [@minidusjr](https://github.com/minidusjr)

---

<div align="center">
Built with Next.js, TypeScript and Tailwind CSS
</div>

