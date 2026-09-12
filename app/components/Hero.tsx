import { CLINIC } from "../lib/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="section border-b border-edge">
      <div className="container-site">
        <p className="kicker">Capstone showcase · WsCube Tech PCAI Cohort 1</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-4xl text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl"
        >
          A 4.9-star clinic with a scheduling problem.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-copy sm:text-xl">
          The Sakhiya AI Business OS captures enquiries in the patient&rsquo;s own language, holds a
          real slot, and tells the team who to call first.
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
            <span aria-hidden="true">★</span>
            <span>
              {CLINIC.rating} / {CLINIC.reviews} reviews
            </span>
          </li>
          <li className="chip">40+ centres</li>
          <li className="chip">{CLINIC.experience}</li>
        </ul>
        <p className="mt-3 text-xs text-copy-muted">
          Figures are public and taken from Google and {CLINIC.siteLabel}. This site is an
          independent student project.
        </p>
      </div>
    </section>
  );
}
