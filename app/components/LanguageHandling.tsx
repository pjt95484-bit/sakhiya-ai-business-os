import { LANGUAGE_ROWS } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function LanguageHandling() {
  return (
    <section
      id="language"
      aria-labelledby="language-title"
      className="section border-t border-edge bg-surface"
    >
      <div className="container-site">
        <SectionHeading
          kicker="08 — Language handling"
          id="language-title"
          title="Language and script are two different questions."
          lede="Meera writes Gujarati using English letters. Most systems collapse that into Hindi. This one answers her in the same pair she used."
        />

        <div className="section-body table-wrap">
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
                <tr key={row.typed} className={row.highlight ? "bg-raised" : undefined}>
                  <td className="font-mono text-copy">{row.typed}</td>
                  <td className={row.highlight ? "font-semibold text-copy" : undefined}>
                    {row.language}
                  </td>
                  <td className={row.highlight ? "font-semibold text-copy" : undefined}>
                    {row.script}
                  </td>
                  <td>{row.reply}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="kicker">The rule</p>
            <p className="mt-2 text-2xl leading-snug text-copy">
              What the patient actually typed beats whatever they selected in a dropdown.
            </p>
          </div>
          <p className="max-w-measure text-sm leading-relaxed text-copy-muted">
            In run #32 the dropdown said English and the message was Gujarati in English letters.
            The system followed the message: score 90, Hot, detected Gujarati / Roman on the
            evidence &ldquo;mane, karvani chhe&rdquo;. The alert told staff to call in Gujarati.
          </p>
        </div>
      </div>
    </section>
  );
}
