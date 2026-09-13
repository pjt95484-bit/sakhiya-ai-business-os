import { SAFETY_RULES } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

const LAYERS = [
  {
    name: "System prompt",
    body: "The assistant is told what it must never say, in plain language, with examples.",
  },
  {
    name: "Platform guardrails",
    body: "ElevenLabs agent-level restrictions that apply regardless of what the prompt says.",
  },
  {
    name: "Workflow code",
    body: "n8n validates inputs and gates the calendar in code. A prompt cannot override a code rule.",
  },
];

export function Safety() {
  return (
    <section
      id="safety"
      aria-labelledby="safety-title"
      className="section border-t border-edge bg-surface"
    >
      <div className="container-site">
        <SectionHeading
          kicker="10 — Safety rules"
          id="safety-title"
          title="Eight things it never does."
          lede="The assistant is a receptionist, not a doctor. Each rule is enforced three times over."
        />

        <div className="section-body grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <ol className="divide-y divide-edge rounded-xl border border-edge bg-surface">
            {SAFETY_RULES.map((rule, i) => (
              <li key={rule} className="grid grid-cols-[3.5rem_1fr] gap-4 px-6 py-6">
                <span className="font-mono text-base text-neon">
                  R{String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[1.0625rem] leading-relaxed text-copy">{rule}</p>
              </li>
            ))}
          </ol>

          <div>
            <h3 className="text-2xl">Three layers</h3>
            <dl className="mt-4">
              {LAYERS.map((l, i) => (
                <div key={l.name} className="mt-4 first:mt-0">
                  <dt className="text-lg font-semibold text-copy">
                    <span className="mr-2.5 font-mono text-base font-normal text-neon">
                      {i + 1}
                    </span>
                    {l.name}
                  </dt>
                  <dd className="mt-1 pl-7 leading-relaxed text-copy-muted">{l.body}</dd>
                </div>
              ))}
            </dl>

            <aside className="mt-8 rounded-xl border border-edge bg-raised p-5">
              <p className="kicker text-neon">One toggle left off, deliberately</p>
              <p className="mt-2.5 leading-relaxed text-copy">
                The platform&rsquo;s medical/legal content guardrail was left <strong>off</strong>,
                because switching it on would block the clinic&rsquo;s own subject matter. Turning a
                safety toggle on without reading it would have broken the product.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
