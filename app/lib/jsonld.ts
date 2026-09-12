import {
  BUILDER,
  FAQ,
  NAV,
  PRODUCT_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
} from "./site";

/**
 * Structured data for answer engines. Deliberately no MedicalBusiness or
 * LocalBusiness entity — this site is not the clinic and must not claim to be.
 */
export function buildJsonLd() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PRODUCT_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: PRODUCT_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    author: { "@type": "Person", name: BUILDER.name },
    featureList: [
      "24/7 multilingual patient assistant (Gujarati, Hinglish, English) via ElevenLabs Agents",
      "Separate detection of language and script, including Roman-script Gujarati",
      "Lead scoring 0–100 with Gemini 3.6 Flash and instant Hot-lead alerts",
      "Booking engine that holds a slot and returns a reference, never confirms",
      "Up to three genuinely open alternative slots when the requested slot is full",
      "Daily follow-up reminders written in the patient's own language and script",
      "Five weekly ad variations self-checked against India healthcare ad rules",
      "Live dashboard in Google Sheets via Coefficient",
      "Eight safety rules enforced in system prompt, platform guardrails and workflow code",
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BUILDER.name,
    jobTitle: "AI automation builder",
    description: `Builder of ${PRODUCT_NAME}, a capstone project for the ${BUILDER.course}.`,
    url: SITE_URL,
    alumniOf: { "@type": "Organization", name: BUILDER.org },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...NAV.map((n, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: n.label,
        item: `${SITE_URL}/#${n.id}`,
      })),
    ],
  };

  return [website, software, person, faq, breadcrumbs];
}
