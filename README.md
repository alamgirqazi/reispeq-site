# Reispeq Technologies LLC — website

Bilingual (English / Arabic) marketing site for Reispeq Technologies LLC.
Built with Next.js 15 and Tailwind CSS v4, and exported as **plain static
files** — there is no server to run, so it hosts anywhere.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the whole site to ./out
```

---

## Deploying

`npm run build` produces `./out`. That folder *is* the website. Upload it
anywhere, or use one of the two paths below.

### Cloudflare Pages (recommended)

Connect the repository in the Cloudflare dashboard and set:

| Setting | Value |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` — or `None` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` |

Add the environment variables from the table further down. Cloudflare handles
the custom domain, TLS and CDN. Nothing else to configure.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Enable it once: **Settings → Pages → Source → GitHub Actions**.

- **Custom domain** (e.g. `reispeq.com`): leave `NEXT_PUBLIC_BASE_PATH` empty
  and add the domain under Settings → Pages.
- **Project page** (`username.github.io/reispeq-site`): set the repository
  variable `NEXT_PUBLIC_BASE_PATH` to `/reispeq-site`, otherwise CSS and links
  resolve to the wrong paths.

`public/.nojekyll` is committed because GitHub Pages would otherwise ignore the
`_next` directory.

### Environment variables

All are optional. Blank, missing or malformed values fall back to sane defaults
rather than breaking the build — CI systems pass undefined variables through as
empty strings, and that must not take the site down.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute base for canonicals, hreflang, sitemap and JSON-LD. Defaults to `https://www.reispeq.com`. **Set this before going live.** A missing `https://` is added for you. |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path for GitHub project pages only. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Where the contact form posts (see below). |
| `NEXT_PUBLIC_CONTACT_ACCESS_KEY` | Only for Web3Forms. |

---

## The contact form

A static site has no backend, so the form posts JSON directly to a form
endpoint you own. Two options that need no code:

**Formspree** — create a form at formspree.io, then set
`NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx`.

**Web3Forms** — free, no account required. Set
`NEXT_PUBLIC_CONTACT_ENDPOINT=https://api.web3forms.com/submit` and
`NEXT_PUBLIC_CONTACT_ACCESS_KEY=<your key>`.

Both deliver submissions to your inbox and keep a dashboard copy.

**With neither set**, the form falls back to opening a pre-filled message in the
visitor's own mail client addressed to `site.email` — so no enquiry is ever
lost silently, but you should configure an endpoint before launch.

If you would rather own the delivery path, a Cloudflare Pages Function or Worker
posting to Resend/SES works the same way — point the endpoint at it.

---

## Editing the site

| What | Where |
| --- | --- |
| All English copy | `src/i18n/en.ts` |
| All Arabic copy | `src/i18n/ar.ts` |
| Company details (email, offices, regions, product links) | `src/lib/site.ts` |
| Pages, navigation and sitemap entries | `src/lib/routes.ts` |
| Colours, type scale, shared utilities | `src/app/globals.css` |

`en.ts` and `ar.ts` are type-checked against each other: if you add a key to one
and forget the other, `npm run build` fails rather than shipping a gap.

### Adding a page

1. Add an entry to `routes.ts` (this feeds the nav, footer and sitemap).
2. Add its copy to `en.ts` and `ar.ts`, including a `seo` entry.
3. Create `src/app/[locale]/<slug>/page.tsx`, copying an existing service page.

---

## Bilingual behaviour

- Routes are `/en/...` and `/ar/...`; slugs stay the same in both languages.
- `/` is a small routing document that sends visitors to the locale matching
  their browser, and carries `noindex` plus a canonical to `/en/`.
- Arabic renders with `dir="rtl"` and IBM Plex Sans Arabic. Layout uses CSS
  logical properties throughout, so it mirrors rather than being re-authored.
- Email addresses and certificate codes are wrapped in `<bdi>` so they stay
  left-to-right inside Arabic text without breaking paragraph alignment.

> The Arabic copy is Modern Standard Arabic written for a Gulf B2B audience.
> Have a native speaker review it before launch — particularly the technical
> terms (`مانع انفجار`, `وحدات الصيانة`, `عدم المطابقة`).

---

## SEO

Per page and per language: title, meta description, canonical, `hreflang`
(including `x-default`), Open Graph and Twitter cards. `sitemap.xml` lists both
locales with alternates; `robots.txt` points at it. Structured data covers
`Organization`, `WebSite`, `Service`, `SoftwareApplication`, `BreadcrumbList`
and `FAQPage`.

Regional keyword sets (Oman, UAE, Saudi, Qatar, Kuwait, Bahrain) live in
`src/lib/seo.ts`.

---

## Before launch

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Configure the contact form endpoint.
- [ ] Replace the placeholder office locations in `src/lib/site.ts`.
- [ ] Confirm the LinkedIn URL in `src/lib/site.ts`, or remove it.
- [ ] Have the Arabic reviewed.
- [ ] Regenerate `public/og.png` if the hero line changes (1200×630).
- [ ] Submit `sitemap.xml` in Google Search Console for both `/en/` and `/ar/`.

## Source material

`_brief/` holds the original write-up and logo supplied for this build. The mark
in `public/logo-reispeq.svg` and `src/components/logo.tsx` is a vector redraw of
`_brief/logo.jpeg`.
