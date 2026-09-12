# PRODUCT.md — Sakhiya AI Business OS (Capstone Showcase Site)

Paste this whole file into Claude Code and ask it to build the site.

---

## 0. What this is

A single-page Next.js site that showcases a working AI Business OS built for **Sakhiya Skin Clinic, Surat** — a real dermatology clinic. The site is both a live product (working AI assistant + working lead form) and a capstone showcase (architecture, evidence, honest failures).

**Built by:** Sandeep "Sujit" Tiwari
**Course:** WsCube Tech Professional Certification in AI (PCAI), Cohort 1
**Mentor:** Nabin sir

### Honesty requirement — non-negotiable

This is a **student capstone demonstration**, not Sakhiya Skin Clinic's official website. The site must carry a clear, visible disclaimer in the header area and again in the footer:

> This is an independent student capstone project demonstrating an AI automation system. It is not the official website of Sakhiya Skin Clinic and is not affiliated with or endorsed by the clinic. Clinic information shown here is publicly available from sakhiyaskinclinic.com. For real appointments, visit sakhiyaskinclinic.com or call 1800 1200 70000.

Do not copy the clinic's logo, brand colours, or imagery. Use an original design.

---

## 1. Tech stack

- **Next.js 14+ (App Router), TypeScript**
- **Tailwind CSS**
- No database. No auth. No backend beyond the existing n8n webhooks.
- Deploy target: **Vercel**
- Repo: GitHub, public

---

## 2. The real story this site tells

Sakhiya Skin Clinic has **4.9 stars across ~3,970 Google reviews**. They do not have a lead problem. Research into their actual reviews surfaced a different problem — one real review of the Vesu branch describes an 11:30 appointment where the patient was made to wait over an hour while staff filmed a promotional reel, and calls the branch "very unprofessional... very badly managed."

**So the real pain is appointment and slot management, not lead volume.** Every design decision in this system traces back to that.

This framing must be the site's central narrative. Do not replace it with generic "clinics need automation" copy.

---

## 3. Verified clinic facts

Use only these. Do not invent any others.

| Fact | Value |
|---|---|
| Founder | Dr. Jagdish Sakhiya |
| Experience | 27+ years |
| Certification | ISO 9001:2015 |
| Scale | 40+ centres across Gujarat, Maharashtra, Delhi, Rajasthan, Madhya Pradesh |
| Vesu centre | 205, 2nd floor, Western Vesu Point, near SD Jain Modern School, Vesu Main Road, Surat 395007 |
| Hours | Monday to Saturday, 10:00 AM – 7:00 PM (closed Sunday) |
| Toll free | 1800 1200 70000 |
| WhatsApp | +91 9875147554 |
| Rating | 4.9 stars, ~3,970 Google reviews |

**Their own five listed patient concerns:** Acne / Pimple · Dark Circles · Dull, Dry & Pigmented Skin · Hair Fall (Alopecia) · Unwanted Hair

**Treatment categories:** Skin · Laser · Anti-Ageing · Hair · Dermato Surgery · Plastic Surgery

---

## 4. Page sections, in order

### 4.1 Header
- Product name: **Sakhiya AI Business OS**
- Subtitle: Clinic Growth OS — built for Sakhiya Skin Clinic, Surat
- Disclaimer banner (see section 0)
- Nav anchors: Problem · System · Live Demo · Evidence · Safety · What Broke

### 4.2 Hero
- Headline idea: *A 4.9-star clinic with a scheduling problem*
- Sub: One line on what the system does — captures enquiries in the patient's own language, holds a real slot, and tells the team who to call first.
- Two buttons: **Talk to the assistant** (scrolls to chat) and **See the architecture** (scrolls to diagram)
- Three stat chips: `4.9★ / 3,970 reviews` · `40+ centres` · `27+ years`

### 4.3 The Problem
Three cards:
1. **Wait time** — the real review, quoted briefly with attribution to a public Google review. Label it clearly as a publicly posted patient review.
2. **Language** — Surat patients write Gujarati in Roman letters ("mane laser karvanu chhe"). Most systems read that as Hindi and reply wrong.
3. **After hours** — enquiries arrive at 11 PM when the clinic is shut.

### 4.4 The Four Core Jobs
Four cards: Marketing & Content · Lead Capture & Sales · Patient Support & Follow-up · Clinic Intelligence.

### 4.5 Architecture Diagram
Inline SVG (no image files). Vertical flow, responsive, uses Tailwind theme colours:

```
Instagram ad / Website
        ↓
AI Assistant (ElevenLabs, 24/7)
        ↓ webhook
n8n backbone
        ↓
 ┌──────────┬──────────────┬──────────────┐
Lead Agent  Follow-up Agent  Ad Creative Agent
 Booking Engine
        ↓
Slack/Email alert · Repeat visit · Ads for approval
        ↓
Live dashboard (Coefficient + Google Sheets)
```

Each node clickable → scrolls to or expands its description.

### 4.6 Live Demo — Assistant
Embed the published ElevenLabs agent.

```
Agent ID: agent_2801m2ab2k9yezktg6djp7c0pebm
```

Use the official ElevenLabs embed widget script with this agent id. Put the id in an env var `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` and read it in the component, with the value above as the documented default.

Also show a direct link as a fallback (works on any phone):
`https://elevenlabs.io/app/talk-to?agent_id=agent_2801m2ab2k9yezktg6djp7c0pebm`

Above the widget, print three suggested test prompts the visitor can copy:
- `mane unwanted hair ni laser treatment karvani chhe`
- `laser hair removal ka kitna charge hai?`
- `kya ye treatment safe hai?`

And a one-line note: the last two are restriction tests — the assistant will refuse to quote a price or call anything safe.

### 4.7 Live Demo — Enquiry Form
A real working form that POSTs JSON to the live n8n webhook.

**Endpoint:** `POST https://pjt90112.app.n8n.cloud/webhook/sakhiya-lead`
**Content-Type:** `application/json`

**Body — send exactly these keys:**

```json
{
  "patient_name": "string",
  "phone": "string, 10 digits",
  "concern": "one of the ten concern values",
  "centre": "one of the centre values",
  "visit_timeline": "This week | Within this month | Just gathering information",
  "time_slot": "Morning (10 AM - 1 PM) | Afternoon (1 PM - 4 PM) | Evening (4 PM - 7 PM) | Any time",
  "language": "Gujarati | Hinglish | English",
  "message": "free text, the patient's own words, unmodified"
}
```

**Concern options:** Acne / Pimple · Acne Scars · Dark Circles · Dull, Dry & Pigmented Skin · Hair Fall (Alopecia) · Unwanted Hair · Anti-Ageing / Wrinkles · Hair Transplant · Tattoo Removal · Other Skin Concern

**Centre options:** Surat - Vesu · Surat - VIP Road · Surat - Adajan · Surat - Bhatar · Surat - Citylight · Ahmedabad

**Critical:** send the `message` field exactly as the user typed it. Do not trim, translate, autocorrect or normalise it. The n8n agent detects the patient's language from that raw text.

**Response handling:** the webhook responds with the last node's JSON. Show a two-stage UI — a "scoring your enquiry…" state while the request is in flight (it takes 20–40 seconds because a Gemini agent runs), then a result card. Never leave the button spinning with no explanation. On error, show a friendly message and the toll-free number.

**Privacy note under the form:** This form sends data to a live demo workflow. Please use test details, not real patient information.

### 4.8 The Three Agents
For each — Lead Qualification, Follow-up & Reminder, Ad Creative — show a four-step **Plan → Act → Check → Improve** card.

| Agent | Plan | Act | Check | Improve |
|---|---|---|---|---|
| Lead Qualification | Read the enquiry and the patient's own words | Gemini scores 0–100, detects language and script | Is it Hot (70+)? | Hot → instant alert naming the language to speak; else nurture queue |
| Follow-up & Reminder | Every morning Mon–Sat, find sessions due within 3 days | Write the reminder in the patient's own language and script | needs_human_review flag | Write status back so nobody is reminded twice |
| Ad Creative | Turn the weekly brief into a Surat-specific buyer persona | Write five ad variations, each from a different angle | Self-check against India healthcare ad rules | Rewrite any failing ad, save all to a sheet marked Awaiting Approval |

### 4.9 The Booking Engine
Explain the design decision plainly:

> The system **holds** a slot and returns a reference. It never says "confirmed." Staff confirm. Confirming without real access to the clinic's calendar would recreate the exact wait-time complaint this build exists to fix.

Show the two outcomes:
- **Slot open** → seat held, reference like `SSC-BK-06485281`, patient told the team will call
- **Slot full** → up to three genuinely open alternatives, read from the live schedule

### 4.10 Language Handling
The distinctive part of this build. Explain that **language and script are two separate decisions**:

| Patient types | Language | Script | Reply |
|---|---|---|---|
| મારે લેસર કરાવવું છે | Gujarati | Gujarati | Gujarati script |
| mane laser karvanu chhe | **Gujarati** | **Roman** | Roman-script Gujarati |
| mujhe laser karvana hai | Hinglish | Roman | Hinglish |
| I want laser treatment | English | Roman | English |

State the rule: **what the patient actually typed beats whatever they selected in a dropdown.** In live tests the dropdown said English and the message was Roman-script Gujarati; the system followed the message.

### 4.11 Evidence — real execution log
A table of actual n8n runs. These are real; do not invent more.

| Run | What was tested | Result |
|---|---|---|
| #32 | Roman-script Gujarati enquiry, dropdown said English | Score 90, Hot, detected Gujarati / Roman, evidence: "mane, karvani chhe" |
| #34 | Second Gujarati enquiry, different concern | Score 90, Hot, detected Gujarati / Roman |
| #24 | Booking with an open slot | Held, reference SSC-BK-13664941 |
| #25 | Booking with a full slot | Returned three genuinely open alternatives |
| #35 | Weekly ad brief | Five distinct Gujarati/Roman ad variations, all compliance-passed |
| #36 | Daily follow-up run, two patients | One reminder in Roman-script Gujarati, one in Hinglish, single run |
| #43 | Booking with empty name and phone | **Refused.** Calendar untouched, returned what was missing |
| #47 | Booking with the words "evening slot" | Mapped correctly to Evening (4 PM – 7 PM) |

Also show the assistant's own numbers: **9 conversations, 100% success rate.**

### 4.12 Safety Rules
Show these as a labelled list, and state that they are enforced in **three layers** — system prompt, platform guardrails, and workflow code.

1. Never gives medical advice, diagnosis, treatment plan or recovery timeline
2. Never states, estimates or hints at any price, package or discount
3. Never says a treatment is safe, painless, effective, guaranteed or permanent
4. Never names the doctor who will treat a patient — 40+ centres, availability is unknown to the system
5. Never compares Sakhiya with another clinic
6. Never writes aftercare instructions — those come only from the treating doctor
7. Never confirms a booking — only holds it
8. Complaints about waiting get an apology with no excuse, then immediate escalation

Add one line: the medical/legal content guardrail was deliberately left **off**, because switching it on would block the clinic's own subject matter. Turning a safety toggle on without reading it would have broken the product.

### 4.13 What Broke — honest failure log
The strongest section on the site. Seven real failures, each with the fix.

| # | What broke | Fix |
|---|---|---|
| 1 | Google Sheets append failed — manual column mapping needs a column schema | Built the row in a Set node, let Sheets auto-map |
| 2 | n8n Gateway Credits returned `nodeNotCovered` | Platform-side bug reported by other users; switched to a personal API key |
| 3 | gemini-2.5-flash closed to new API keys | Moved to gemini-3.6-flash |
| 4 | The model stuffed a whole drafted reply into the `reply_script` field | Replaced the example schema with a strict JSON schema using enums |
| 5 | Assistant called the booking tool before it had name and phone | Added a validation gate in n8n — the calendar is untouched until all details exist |
| 6 | Patient asked for **evening**, system booked **afternoon** | Moved slot mapping out of the prompt and into code |
| 7 | The enum meant to prevent #6 was itself causing it — the model had to pick a fixed value and picked wrong | Removed the enum on slot and centre; the agent now sends the patient's raw words and code converts them |

End the section with the lesson, stated plainly:

> **A prompt is a request. Code is a rule.** The slot mapping was written into the prompt three times and ignored three times. Written once in code, it has not failed since. Anything that actually matters belongs in code, not in a prompt.

### 4.14 What It Saves
Frame as estimates from the build, not as claims of measured clinic outcomes. Label the section "Projected impact — based on the system's design, not yet measured in production."

- Enquiries answered in seconds, at any hour, instead of the next morning
- Every enquiry logged; none lost in a DM inbox
- Staff told which language to call in before they dial
- Follow-up reminders sent without anyone remembering to send them
- Five ad variations per week without a content team

### 4.15 Tech Stack Used
n8n · Gemini 3.6 Flash · ElevenLabs Agents · Google Sheets · Gmail · Coefficient · Claude Code · GitHub · Vercel

### 4.16 Acknowledgement
A short, sincere section thanking **Nabin sir** and WsCube Tech. Include this line:

> Sir, aapne hame itna kabil banaya ki hum ek complete AI Business OS zero se bana sake — AURA se ENGINE tak, aur ab INFINITY. Dhanyavaad.

### 4.17 Footer
Repeat the disclaimer. Link to sakhiyaskinclinic.com as the official site. Toll free and WhatsApp. Built-by line.

---

## 5. AEO / SEO / LLM optimisation

### 5.1 Metadata
- `title`: Sakhiya AI Business OS — Clinic Growth OS for Surat Clinics
- `description`: A working AI Business OS built for a real Surat dermatology clinic — multilingual patient assistant, real slot booking, lead scoring in Gujarati, Hinglish and English.
- Open Graph + Twitter card, `og:image` generated with `next/og`
- `canonical` URL
- `lang="en"` on html, with a note in content that the product itself handles gu/hi/en

### 5.2 JSON-LD structured data
Embed all of these as `application/ld+json`:

- **WebSite** — name, url, description
- **SoftwareApplication** — name "Sakhiya AI Business OS", applicationCategory "BusinessApplication", operatingSystem "Web", featureList array
- **Person** — Sandeep Tiwari, the builder, with role and the course
- **FAQPage** — see 5.3
- **BreadcrumbList** — for the section anchors

Do **not** emit a `MedicalBusiness` or `LocalBusiness` schema for Sakhiya Skin Clinic. This site is not the clinic and must not claim to be its entity in structured data.

### 5.3 FAQPage content
Write these as real, answerable Q&A — this is what AI search engines lift:

1. What is an AI Business OS for a clinic?
2. How does the system handle Gujarati written in Roman letters?
3. Does the AI assistant book appointments by itself?
4. What stops the AI from giving medical advice or quoting prices?
5. What happens when the requested slot is full?
6. Which tools is the system built with?
7. What happened when the AI got something wrong?

### 5.4 llms.txt
Create `/public/llms.txt`. Follow the llms.txt convention — a short H1, a blockquote summary, then linked sections with one-line descriptions. Cover: what the system is, who built it, the client problem, the architecture, the language handling, the safety rules, the failure log, and the tech stack. Keep it factual and skimmable. Include the disclaimer line.

Also create `/public/llms-full.txt` with the full page content as clean markdown.

### 5.5 robots.txt
Allow all crawlers. Explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended. Link the sitemap.

### 5.6 sitemap.xml
Generate via Next.js `sitemap.ts`.

### 5.7 Answer-engine writing style
Throughout the site, write so an AI can quote it:
- Lead every section with a direct, self-contained sentence that answers the section's implied question
- Use real numbers and real names, not vague claims
- Keep paragraphs under four sentences
- Use semantic HTML — `<article>`, `<section>`, `<h2>`/`<h3>` hierarchy, `<table>` for tabular data, `<dl>` for definitions
- Every claim that could be checked should be checkable

---

## 6. Design direction

- **Not a generic dark SaaS gradient template.** Aim for something closer to a clinical case study — calm, confident, lots of whitespace.
- Light base. One accent colour used sparingly. Avoid clinic-blue cliché; consider a deep green or warm neutral.
- Typography does the work: a strong serif or grotesk for headings, clean sans for body. Generous line height.
- Evidence tables should look like evidence — monospace for IDs and references.
- The failure log section should visually feel *different* from the rest — this is the part that earns trust.
- Fully responsive; the assistant widget and the form must work on a phone, because judges will open it on a phone.
- Respect `prefers-reduced-motion`. Keep animation minimal.
- Accessibility: real focus states, labelled form fields, alt text, colour contrast AA.

---

## 7. Build order

1. Scaffold Next.js + TypeScript + Tailwind
2. Layout, metadata, disclaimer banner
3. All content sections with real copy from this file
4. SVG architecture diagram
5. Enquiry form with the two-stage loading UI and error handling
6. ElevenLabs widget embed + fallback link
7. JSON-LD, llms.txt, llms-full.txt, robots.txt, sitemap
8. Responsive pass, accessibility pass
9. `npm run build` must pass clean
10. Push to GitHub, deploy to Vercel

---

## 8. Environment variables

```
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=agent_2801m2ab2k9yezktg6djp7c0pebm
NEXT_PUBLIC_N8N_LEAD_WEBHOOK=https://pjt90112.app.n8n.cloud/webhook/sakhiya-lead
NEXT_PUBLIC_SITE_URL=https://<your-vercel-domain>
```

Commit a `.env.example` with these keys. Never commit real secrets — none of the above are secrets, but keep the pattern.

---

## 9. Definition of done

- [ ] `npm run build` passes with no errors
- [ ] Form submits and a row appears in the live Google Sheet
- [ ] Assistant widget loads and replies on desktop and on a phone
- [ ] Disclaimer visible in header and footer
- [ ] All seven failures listed honestly
- [ ] llms.txt, robots.txt, sitemap.xml all reachable
- [ ] JSON-LD validates in Google's Rich Results Test
- [ ] Lighthouse: Performance 90+, Accessibility 95+, SEO 100
- [ ] No invented clinic facts anywhere
- [ ] No claim of being the official Sakhiya website
