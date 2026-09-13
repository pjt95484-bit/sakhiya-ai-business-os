import { ASSISTANT_STATS, EVIDENCE_RUNS } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function Evidence() {
  return (
    <section
      id="evidence"
      aria-labelledby="evidence-title"
      className="section border-t border-edge"
    >
      <div className="container-site">
        <SectionHeading
          kicker="09 — Evidence"
          id="evidence-title"
          title="Eight real runs."
          lede="Actual execution numbers from the workflow history. Run #43 is here on purpose: a refusal is a result."
        />

        <div className="section-body table-wrap">
          <table className="table-evidence w-full min-w-[44rem]">
            <caption className="sr-only">Execution log of real n8n runs and their results</caption>
            <thead>
              <tr>
                <th scope="col" className="w-20">
                  Run
                </th>
                <th scope="col">What was tested</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE_RUNS.map((r) => (
                <tr key={r.run}>
                  <td className="font-mono text-copy">{r.run}</td>
                  <td className="text-copy">{r.tested}</td>
                  <td className={r.refused ? "font-medium text-copy" : "text-copy"}>
                    {r.result.split(/(SSC-BK-\d+)/).map((part, i) =>
                      /^SSC-BK-\d+$/.test(part) ? (
                        <span key={i} className="font-mono text-copy">
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      ),
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div className="card">
            <dt className="text-xs uppercase tracking-wider text-copy-muted">Conversations</dt>
            <dd className="mt-1 text-4xl">{ASSISTANT_STATS.conversations}</dd>
          </div>
          <div className="card">
            <dt className="text-xs uppercase tracking-wider text-copy-muted">Success rate</dt>
            <dd className="mt-1 text-4xl">{ASSISTANT_STATS.successRate}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-copy-muted">
          Assistant figures are from the ElevenLabs dashboard at the time of writing.
        </p>
      </div>
    </section>
  );
}
