import { AGENTS } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

const IDS: Record<string, string> = {
  "Lead Qualification": "agent-lead-qualification",
  "Follow-up & Reminder": "agent-follow-up",
  "Ad Creative": "agent-ad-creative",
};

const STEPS = [
  ["plan", "Plan"],
  ["act", "Act"],
  ["check", "Check"],
  ["improve", "Improve"],
] as const;

export function Agents() {
  return (
    <section
      id="agents"
      aria-labelledby="agents-title"
      className="section border-t border-edge bg-surface"
    >
      <div className="container-site">
        <SectionHeading
          kicker="06 — The three agents"
          id="agents-title"
          title="Each agent runs the same four-step loop: Plan, Act, Check, Improve."
          lede="Three Gemini 3.6 Flash agents live inside n8n. None of them talks to a patient directly — they read, score, draft and flag, and a person or a code rule decides what happens next."
        />

        <div className="section-body grid gap-5 lg:grid-cols-3">
          {AGENTS.map((agent) => (
            <article key={agent.name} id={IDS[agent.name]} className="card">
              <h3 className="text-xl">{agent.name}</h3>
              <ol className="mt-5 space-y-4">
                {STEPS.map(([key, label], i) => (
                  <li key={key} className="grid grid-cols-[2.25rem_1fr] gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-raised font-mono text-xs text-neon">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-copy-muted">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-copy">{agent[key]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
