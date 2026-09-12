import { IMPACT, TECH_STACK } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="section border-t border-edge">
      <div className="container-site">
        <SectionHeading
          kicker="12 — Projected impact"
          id="impact-title"
          title="What it saves — based on the system's design, not yet measured in production."
          lede="These are estimates from how the build works, not measured clinic outcomes. The system has not run inside Sakhiya Skin Clinic's operations."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT.map((item, i) => (
            <li key={item} className="card">
              <span className="font-mono text-xs text-neon">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 leading-relaxed text-copy">{item}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16" id="stack">
          <h3 className="text-xl">Tech stack used</h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools used to build the system">
            {TECH_STACK.map((t) => (
              <li key={t} className="chip font-mono text-xs">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
