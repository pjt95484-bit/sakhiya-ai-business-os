import { BUILDER } from "../lib/site";

export function Acknowledgement() {
  return (
    <section id="thanks" aria-labelledby="thanks-title" className="section border-t border-line">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="kicker">14 — Acknowledgement</p>
          <h2 id="thanks-title" className="h2">
            Thank you, {BUILDER.mentor}.
          </h2>
          <p className="lede">
            This system exists because of the {BUILDER.course} and the patience of one mentor who
            insisted that a demo is not done until it is honest. Thank you to {BUILDER.org} for the
            course, and to {BUILDER.mentor} for every review that sent this build back to the drawing
            board.
          </p>
          <blockquote className="mt-8 border-l-2 border-moss-600 pl-5 font-serif text-xl leading-snug text-ink sm:text-2xl">
            <p lang="hi-Latn">
              Sir, aapne hame itna kabil banaya ki hum ek complete AI Business OS zero se bana sake —
              AURA se ENGINE tak, aur ab INFINITY. Dhanyavaad.
            </p>
          </blockquote>
          <p className="mt-6 text-sm text-ink-mute">
            — {BUILDER.name}, {BUILDER.course}
          </p>
        </div>
      </div>
    </section>
  );
}
