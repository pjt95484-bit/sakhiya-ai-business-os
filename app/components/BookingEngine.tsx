import { SectionHeading } from "./SectionHeading";

export function BookingEngine() {
  return (
    <section id="booking" aria-labelledby="booking-title" className="section border-t border-edge">
      <div className="container-site">
        <SectionHeading
          kicker="07 — The booking engine"
          id="booking-title"
          title={
            <>
              Her slot is <span className="text-neon">held</span>, never confirmed.
            </>
          }
          lede="Staff confirm. A system with no real view of the calendar promising a time is exactly how the 11:30 complaint happened."
        />

        <div className="section-body grid gap-5 md:grid-cols-2">
          <article className="card">
            <p className="kicker">Outcome 1 · Slot open</p>
            <h3 className="mt-3 text-xl">Seat held, reference returned</h3>
            <p className="mt-3 text-sm leading-relaxed text-copy-muted">
              Meera gets a reference and a call-back. Nothing is promised that a person has not
              checked.
            </p>
            <div className="mt-5 rounded-lg border border-edge bg-ground p-4">
              <p className="text-xs uppercase tracking-wider text-copy-muted">Hold reference</p>
              <p className="mt-1 font-mono text-lg text-copy">SSC-BK-06485281</p>
              <p className="mt-2 text-sm text-copy">
                &ldquo;Aapno slot hold thai gayo chhe. Team tamne call karse confirm karva.&rdquo;
              </p>
            </div>
          </article>

          <article className="card">
            <p className="kicker">Outcome 2 · Slot full</p>
            <h3 className="mt-3 text-xl">Three genuinely open alternatives</h3>
            <p className="mt-3 text-sm leading-relaxed text-copy-muted">
              Real openings from the live schedule, not guesses. Verified in run #25.
            </p>
            <ul className="mt-5 space-y-2">
              {["Alternative 1", "Alternative 2", "Alternative 3"].map((label, i) => (
                <li
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-edge bg-ground px-4 py-2.5 text-sm"
                >
                  <span className="font-mono text-copy-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-copy">Read from the live schedule</span>
                  <span className="rounded-full bg-raised px-2 py-0.5 text-xs text-neon">open</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-8 max-w-measure text-sm leading-relaxed text-copy-muted">
          A third path matters as much. Missing name or phone and it refuses, calendar untouched
          (run #43). &ldquo;Evening&rdquo; becomes an evening slot in code, not by the model (run
          #47).
        </p>
      </div>
    </section>
  );
}
