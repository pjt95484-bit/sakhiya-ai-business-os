# Sakhiya AI Business OS — capstone showcase site

Single-page Next.js site showcasing a working AI Business OS built for Sakhiya Skin Clinic, Surat, as a student capstone for the WsCube Tech Professional Certification in AI (PCAI), Cohort 1.

> This is an independent student capstone project. It is not the official website of Sakhiya Skin Clinic and is not affiliated with or endorsed by the clinic. For real appointments, visit sakhiyaskinclinic.com or call 1800 1200 70000.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional — defaults are baked in
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Environment variables

See [.env.example](.env.example). None are secrets.

| Key | Purpose |
|---|---|
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | Published ElevenLabs agent embedded on the page |
| `NEXT_PUBLIC_N8N_LEAD_WEBHOOK` | Live n8n webhook the enquiry form POSTs to |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap and JSON-LD |

After deploying to Vercel, set `NEXT_PUBLIC_SITE_URL` to the real domain and update the `Sitemap:` line in `public/robots.txt` and the links in `public/llms.txt`.

## Structure

- `app/page.tsx` — section order
- `app/components/` — one component per section
- `app/lib/site.ts` — every fact, figure and option on the site, in one place
- `app/lib/jsonld.ts` — WebSite, SoftwareApplication, Person, FAQPage, BreadcrumbList
- `app/opengraph-image.tsx` — OG image via `next/og`
- `app/sitemap.ts` — sitemap
- `public/llms.txt`, `public/llms-full.txt`, `public/robots.txt`

Spec: [PRODUCT.md](PRODUCT.md)
