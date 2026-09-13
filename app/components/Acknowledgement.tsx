import { BUILDER } from "../lib/site";

export function Acknowledgement() {
  return (
    <section id="thanks" aria-labelledby="thanks-title" className="section border-t border-edge">
      <div className="container-site">
        <div>
          <p className="kicker">14 — Acknowledgement</p>
          <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <h2 id="thanks-title" className="h2">
              Thank you, {BUILDER.mentor}.
            </h2>
            <p className="lede lg:mt-0">
              Thank you to {BUILDER.org} for the course, and to {BUILDER.mentor} for every review
              that sent this build back to the drawing board.
            </p>
          </div>
          <blockquote className="section-body border-l-2 border-neon pl-6 text-2xl leading-snug text-copy sm:text-3xl">
            <p lang="hi-Latn">
              Sir, aapne hame itna kabil banaya ki hum ek complete AI Business OS zero se bana sake
              — AURA se ENGINE tak, aur ab INFINITY. Dhanyavaad.
            </p>
          </blockquote>
          <p className="mt-6 text-sm text-copy-muted">
            — {BUILDER.name}, {BUILDER.course}
          </p>
        </div>
      </div>
    </section>
  );
}
