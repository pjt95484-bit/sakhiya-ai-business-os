import { BUILDER } from "../lib/site";

export function Acknowledgement() {
  return (
    <section id="thanks" aria-labelledby="thanks-title" className="section border-t border-edge">
      <div className="container-site">
        <div className="max-w-[46rem]">
          <p className="kicker">14 — Acknowledgement</p>
          <h2 id="thanks-title" className="h2">
            Thank you, {BUILDER.mentor}.
          </h2>
          <p className="lede">
            Thank you to {BUILDER.org} for the course, and to {BUILDER.mentor} for every review that
            sent this build back to the drawing board.
          </p>
          <blockquote className="mt-10 border-l-2 border-neon pl-6 text-xl leading-snug text-copy sm:text-2xl">
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
