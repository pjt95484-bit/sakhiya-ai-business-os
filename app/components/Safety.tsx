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
          title="Eight things the assistant never does, enforced in three layers."
          lede="A dermatology clinic is a medical business. The assistant is a receptionist, not a doctor, and the rules below keep it there. Each rule lives in the system prompt, in the platform guardrails and in the workflow code."
        />

        <div className="section-body grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <ol className="divide-y divide-edge rounded-xl border border-edge bg-surface">
            {SAFETY_RULES.map((rule, i) => (
              <li key={rule} className="grid grid-cols-[3rem_1fr] gap-3 px-5 py-4">
                <span className="font-mono text-sm text-neon">
                  R{String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-copy">{rule}</p>
              </li>
            ))}
          </ol>

          <div>
            <h3 className="text-xl">Three layers</h3>
            <dl className="mt-4">
              {LAYERS.map((l, i) => (
                <div key={l.name} className="mt-4 first:mt-0">
                  <dt className="font-medium text-copy">
                    <span className="mr-2 font-mono text-sm font-normal text-copy-muted">
                      {i + 1}
                    </span>
                    {l.name}
                  </dt>
                  <dd className="mt-0.5 pl-6 text-sm leading-relaxed text-copy">{l.body}</dd>
                </div>
              ))}
            </dl>

            <aside className="mt-8 rounded-xl border border-edge bg-raised p-5">
              <p className="kicker text-neon">One toggle left off, deliberately</p>
              <p className="mt-2 text-sm leading-relaxed text-copy">
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
