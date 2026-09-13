/**
 * Site-wide constants. Every clinic fact here comes from PRODUCT.md, which in
 * turn comes from sakhiyaskinclinic.com. Do not add facts that are not there.
 */

/** Last-resort site origin. Must stay a valid absolute URL literal. */
const DEFAULT_SITE_URL = "https://sakhiya-ai-business-os.vercel.app";

/**
 * Resolve the canonical origin from the first usable candidate.
 *
 * `??` alone is not enough: it only falls back on null/undefined, so an env
 * var that is *defined but empty* (which is how Vercel stores a variable added
 * with a blank value) passes straight through. `new URL("")` then throws
 * ERR_INVALID_URL and the build dies collecting page data. Every candidate is
 * therefore trimmed, emptiness-checked, and parsed before it is trusted.
 */
function resolveSiteUrl(...candidates: (string | undefined)[]): string {
  for (const candidate of candidates) {
    const trimmed = candidate?.trim();
    if (!trimmed) continue;
    // Vercel's *_URL system vars carry no protocol.
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      const parsed = new URL(withProtocol);
      if (!parsed.hostname) continue;
      return `${parsed.origin}${parsed.pathname}`.replace(/\/$/, "");
    } catch {
      // Not a usable URL — try the next candidate.
    }
  }
  return DEFAULT_SITE_URL;
}

// Each env var is referenced as a literal member expression so Next can inline
// it at build time; a computed lookup would not be replaced.
export const SITE_URL = resolveSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
  process.env.NEXT_PUBLIC_VERCEL_URL,
  DEFAULT_SITE_URL,
);

function resolveNonEmpty(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export const ELEVENLABS_AGENT_ID = resolveNonEmpty(
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
  "agent_2801m2ab2k9yezktg6djp7c0pebm",
);

export const N8N_LEAD_WEBHOOK = resolveNonEmpty(
  process.env.NEXT_PUBLIC_N8N_LEAD_WEBHOOK,
  "https://pjt90112.app.n8n.cloud/webhook/sakhiya-lead",
);

export const ELEVENLABS_TALK_URL = `https://elevenlabs.io/app/talk-to?agent_id=${ELEVENLABS_AGENT_ID}`;

export const PRODUCT_NAME = "Sakhiya AI Business OS";
export const PRODUCT_TAGLINE = "Clinic Growth OS — built for Sakhiya Skin Clinic, Surat";

export const SITE_TITLE = "Sakhiya AI Business OS — Clinic Growth OS for Surat Clinics";
export const SITE_DESCRIPTION =
  "A working AI Business OS built for a real Surat dermatology clinic — multilingual patient assistant, real slot booking, lead scoring in Gujarati, Hinglish and English.";

export const DISCLAIMER =
  "This is an independent student capstone project demonstrating an AI automation system. It is not the official website of Sakhiya Skin Clinic and is not affiliated with or endorsed by the clinic. Clinic information shown here is publicly available from sakhiyaskinclinic.com. For real appointments, visit sakhiyaskinclinic.com or call 1800 1200 70000.";

export const BUILDER = {
  name: "Sandeep Tiwari",
  course: "WsCube Tech Professional Certification in AI (PCAI), Cohort 1",
  mentor: "Navin sir",
  org: "WsCube Tech",
};

export const CLINIC = {
  name: "Sakhiya Skin Clinic",
  site: "https://sakhiyaskinclinic.com",
  siteLabel: "sakhiyaskinclinic.com",
  founder: "Dr. Jagdish Sakhiya",
  experience: "27+ years",
  certification: "ISO 9001:2015",
  scale: "40+ centres across Gujarat, Maharashtra, Delhi, Rajasthan, Madhya Pradesh",
  vesuAddress:
    "205, 2nd floor, Western Vesu Point, near SD Jain Modern School, Vesu Main Road, Surat 395007",
  hours: "Monday to Saturday, 10:00 AM – 7:00 PM (closed Sunday)",
  tollFree: "1800 1200 70000",
  tollFreeHref: "tel:1800120070000",
  whatsapp: "+91 9875147554",
  whatsappHref: "https://wa.me/919875147554",
  rating: "4.9",
  reviews: "3,970",
  concerns: [
    "Acne / Pimple",
    "Dark Circles",
    "Dull, Dry & Pigmented Skin",
    "Hair Fall (Alopecia)",
    "Unwanted Hair",
  ],
  treatmentCategories: [
    "Skin",
    "Laser",
    "Anti-Ageing",
    "Hair",
    "Dermato Surgery",
    "Plastic Surgery",
  ],
};

export const NAV = [
  { id: "problem", label: "Problem" },
  { id: "system", label: "System" },
  { id: "demo", label: "Live Demo" },
  { id: "evidence", label: "Evidence" },
  { id: "safety", label: "Safety" },
  { id: "what-broke", label: "What Broke" },
] as const;

export const FORM_OPTIONS = {
  concern: [
    "Acne / Pimple",
    "Acne Scars",
    "Dark Circles",
    "Dull, Dry & Pigmented Skin",
    "Hair Fall (Alopecia)",
    "Unwanted Hair",
    "Anti-Ageing / Wrinkles",
    "Hair Transplant",
    "Tattoo Removal",
    "Other Skin Concern",
  ],
  centre: [
    "Surat - Vesu",
    "Surat - VIP Road",
    "Surat - Adajan",
    "Surat - Bhatar",
    "Surat - Citylight",
    "Ahmedabad",
  ],
  visit_timeline: ["This week", "Within this month", "Just gathering information"],
  time_slot: [
    "Morning (10 AM - 1 PM)",
    "Afternoon (1 PM - 4 PM)",
    "Evening (4 PM - 7 PM)",
    "Any time",
  ],
  language: ["Gujarati", "Hinglish", "English"],
} as const;

export const TEST_PROMPTS = [
  { text: "mane unwanted hair ni laser treatment karvani chhe", kind: "normal" },
  { text: "laser hair removal ka kitna charge hai?", kind: "restriction" },
  { text: "kya ye treatment safe hai?", kind: "restriction" },
] as const;

export const EVIDENCE_RUNS = [
  {
    run: "#32",
    tested: "Roman-script Gujarati enquiry, dropdown said English",
    result: "Score 90, Hot, detected Gujarati / Roman, evidence: “mane, karvani chhe”",
  },
  {
    run: "#34",
    tested: "Second Gujarati enquiry, different concern",
    result: "Score 90, Hot, detected Gujarati / Roman",
  },
  {
    run: "#24",
    tested: "Booking with an open slot",
    result: "Held, reference SSC-BK-13664941",
  },
  {
    run: "#25",
    tested: "Booking with a full slot",
    result: "Returned three genuinely open alternatives",
  },
  {
    run: "#35",
    tested: "Weekly ad brief",
    result: "Five distinct Gujarati/Roman ad variations, all compliance-passed",
  },
  {
    run: "#36",
    tested: "Daily follow-up run, two patients",
    result: "One reminder in Roman-script Gujarati, one in Hinglish, single run",
  },
  {
    run: "#43",
    tested: "Booking with empty name and phone",
    result: "Refused. Calendar untouched, returned what was missing",
    refused: true,
  },
  {
    run: "#47",
    tested: "Booking with the words “evening slot”",
    result: "Mapped correctly to Evening (4 PM – 7 PM)",
  },
];

export const ASSISTANT_STATS = { conversations: 9, successRate: "100%" };

export const SAFETY_RULES = [
  "Never gives medical advice, diagnosis, treatment plan or recovery timeline",
  "Never states, estimates or hints at any price, package or discount",
  "Never says a treatment is safe, painless, effective, guaranteed or permanent",
  "Never names the doctor who will treat a patient — 40+ centres, availability is unknown to the system",
  "Never compares Sakhiya with another clinic",
  "Never writes aftercare instructions — those come only from the treating doctor",
  "Never confirms a booking — only holds it",
  "Complaints about waiting get an apology with no excuse, then immediate escalation",
];

export const FAILURES = [
  {
    broke: "Google Sheets append failed — manual column mapping needs a column schema",
    fix: "Built the row in a Set node, let Sheets auto-map",
  },
  {
    broke: "n8n Gateway Credits returned nodeNotCovered",
    fix: "Platform-side bug reported by other users; switched to a personal API key",
  },
  {
    broke: "gemini-2.5-flash closed to new API keys",
    fix: "Moved to gemini-3.6-flash",
  },
  {
    broke: "The model stuffed a whole drafted reply into the reply_script field",
    fix: "Replaced the example schema with a strict JSON schema using enums",
  },
  {
    broke: "Assistant called the booking tool before it had name and phone",
    fix: "Added a validation gate in n8n — the calendar is untouched until all details exist",
  },
  {
    broke: "Patient asked for evening, system booked afternoon",
    fix: "Moved slot mapping out of the prompt and into code",
  },
  {
    broke:
      "The enum meant to prevent #6 was itself causing it — the model had to pick a fixed value and picked wrong",
    fix: "Removed the enum on slot and centre; the agent now sends the patient's raw words and code converts them",
  },
];

export const AGENTS = [
  {
    name: "Lead Qualification",
    plan: "Read the enquiry and the patient's own words",
    act: "Gemini scores 0–100, detects language and script",
    check: "Is it Hot (70+)?",
    improve: "Hot → instant alert naming the language to speak; else nurture queue",
  },
  {
    name: "Follow-up & Reminder",
    plan: "Every morning Mon–Sat, find sessions due within 3 days",
    act: "Write the reminder in the patient's own language and script",
    check: "needs_human_review flag",
    improve: "Write status back so nobody is reminded twice",
  },
  {
    name: "Ad Creative",
    plan: "Turn the weekly brief into a Surat-specific buyer persona",
    act: "Write five ad variations, each from a different angle",
    check: "Self-check against India healthcare ad rules",
    improve: "Rewrite any failing ad, save all to a sheet marked Awaiting Approval",
  },
];

export const LANGUAGE_ROWS = [
  {
    typed: "મારે લેસર કરાવવું છે",
    language: "Gujarati",
    script: "Gujarati",
    reply: "Gujarati script",
    highlight: false,
  },
  {
    typed: "mane laser karvanu chhe",
    language: "Gujarati",
    script: "Roman",
    reply: "Roman-script Gujarati",
    highlight: true,
  },
  {
    typed: "mujhe laser karvana hai",
    language: "Hinglish",
    script: "Roman",
    reply: "Hinglish",
    highlight: false,
  },
  {
    typed: "I want laser treatment",
    language: "English",
    script: "Roman",
    reply: "English",
    highlight: false,
  },
];

export const TECH_STACK = [
  "n8n",
  "Gemini 3.6 Flash",
  "ElevenLabs Agents",
  "Google Sheets",
  "Gmail",
  "Coefficient",
  "Claude Code",
  "GitHub",
  "Vercel",
];

export const IMPACT = [
  "Enquiries answered in seconds, at any hour",
  "Every enquiry logged, none lost in a DM inbox",
  "Staff told which language to call in, before they dial",
  "Reminders sent without anyone remembering to send them",
  "Five ad variations per week without a content team",
];

export const FAQ = [
  {
    q: "What is an AI Business OS for a clinic?",
    a: "It is one connected system that handles a clinic’s repeatable front-desk work: answering enquiries at any hour, capturing every lead, holding appointment slots, sending follow-up reminders and drafting ad copy. This one runs on an ElevenLabs assistant, an n8n backbone, three Gemini agents and a Google Sheets dashboard, built as a student capstone for a real Surat dermatology clinic.",
  },
  {
    q: "How does the system handle Gujarati written in Roman letters?",
    a: "It treats language and script as two separate questions. “mane laser karvanu chhe” is read as Gujarati in Roman script, and answered in Roman-script Gujarati rather than Hindi. What the patient typed beats the dropdown: in run #32 the dropdown said English, the message was Roman-script Gujarati, and the system followed the message.",
  },
  {
    q: "Does the AI assistant book appointments by itself?",
    a: "No. It holds a slot, returns a reference such as SSC-BK-06485281, and tells the patient the team will call. It never says confirmed, because it has no real view of the clinic’s calendar and a false confirmation would recreate the wait-time complaint this build exists to fix. Staff confirm.",
  },
  {
    q: "What stops the AI from giving medical advice or quoting prices?",
    a: "Eight rules, enforced in three layers: the system prompt, the ElevenLabs platform guardrails, and the n8n workflow code. No medical advice, no price, no claim that a treatment is safe, no named doctor, no comparison with another clinic, no aftercare, no confirmed booking. A prompt like “laser hair removal ka kitna charge hai?” is refused.",
  },
  {
    q: "What happens when the requested slot is full?",
    a: "The booking engine reads the live schedule and offers up to three genuinely open alternatives instead of guessing. Verified in run #25. When the slot is open the seat is held and a reference returned, as in run #24 (SSC-BK-13664941).",
  },
  {
    q: "Which tools is the system built with?",
    a: "n8n for the workflow backbone, Gemini 3.6 Flash for the three agents, ElevenLabs Agents for the 24/7 assistant, Google Sheets and Gmail for logging and alerts, Coefficient for the dashboard, Claude Code for this site, GitHub and Vercel for hosting.",
  },
  {
    q: "What happened when the AI got something wrong?",
    a: "Seven failures are logged publicly on this site with their fixes. The sharpest: a patient asked for an evening slot and the system booked afternoon. The mapping was written into the prompt three times and ignored three times; moved into code, it has not failed since. A prompt is a request. Code is a rule.",
  },
];
