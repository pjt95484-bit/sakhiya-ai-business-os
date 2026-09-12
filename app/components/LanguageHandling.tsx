import { LANGUAGE_ROWS } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function LanguageHandling() {
  return (
    <section id="language" aria-labelledby="language-title" className="section border-t border-line bg-white">
      <div className="container-site">
        <SectionHeading
          kicker="08 — Language handling"
          id="language-title"
          title="Language and script are two separate decisions."
          lede="A Surat patient can write Gujarati in Gujarati letters or in Roman letters. Most systems collapse both into “Hindi” and reply wrong. This one detects the language first, the script second, and replies in the same pair."
        />

        <div className="mt-12 overflow-x-auto rounded-xl border border-line bg-card">
          <table className="table-evidence w-full min-w-[40rem]">
            <caption className="sr-only">
              How the system maps what a patient types to a language, a script and a reply
            </caption>
            <thead>
              <tr>
                <th scope="col">Patient types</th>
                <th scope="col">Language</th>
                <th scope="col">Script</th>
                <th scope="col">Reply</th>
              </tr>
            </thead>
            <tbody>
              {LANGUAGE_ROWS.map((row) => (
                <tr key={row.typed} className={row.highlight ? "bg-moss-50/60" : undefined}>
                  <td className="font-mono text-ink">{row.typed}</td>
                  <td className={row.highlight ? "font-semibold text-moss-800" : undefined}>{row.language}</td>
                  <td className={row.highlight ? "font-semibold text-moss-800" : undefined}>{row.script}</td>
                  <td>{row.reply}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-xl border-l-4 border-moss-600 bg-moss-50 px-5 py-4">
            <p className="font-serif text-xl text-moss-900">
              What the patient actually typed beats whatever they selected in a dropdown.
            </p>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-ink-soft">
            In live tests the dropdown said English and the message was Roman-script Gujarati. The
            system followed the message: execution run #32 scored it 90, marked it Hot, and detected
            Gujarati / Roman with the evidence &ldquo;mane, karvani chhe&rdquo;. The staff alert named
            Gujarati as the language to call in.
          </p>
        </div>
      </div>
    </section>
  );
}
