import { CLINIC } from "../lib/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="section border-b border-edge">
      <div className="container-site">
        <p className="kicker">Capstone showcase · WsCube Tech PCAI Cohort 1</p>
        {/* Part B2 — display capped at 3.5rem so it sits in scale with body copy. */}
        <h1
          id="hero-title"
          className="mt-[var(--space-eyebrow)] max-w-[20ch] text-[2.25rem] sm:text-[2.875rem] lg:text-[3.5rem]"
        >
          A 4.9-star clinic with a <span className="text-neon">scheduling problem</span>.
        </h1>
        <p className="mt-[var(--space-lead)] max-w-[52ch] text-[1.0625rem] leading-relaxed text-copy-muted sm:text-lg">
          It answers her in her own language, holds a real slot, and tells the team who to call
          first.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#assistant" className="btn-primary">
            Talk to the assistant
          </a>
          <a href="#system" className="btn-secondary">
            See the architecture
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Verified clinic facts">
          <li className="chip">
            <span aria-hidden="true" className="text-neon">
              ★
            </span>
            <span>
              {CLINIC.rating} / {CLINIC.reviews} reviews
            </span>
          </li>
          <li className="chip">40+ centres</li>
          <li className="chip">{CLINIC.experience}</li>
        </ul>
        <p className="mt-3 text-xs text-copy-muted">
          Figures are public, from Google and {CLINIC.siteLabel}. This is an independent student
          project.
        </p>
      </div>
    </section>
  );
}
