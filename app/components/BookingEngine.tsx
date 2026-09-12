import { SectionHeading } from "./SectionHeading";

export function BookingEngine() {
  return (
    <section id="booking" aria-labelledby="booking-title" className="section border-t border-edge">
      <div className="container-site">
        <SectionHeading
          kicker="07 — The booking engine"
          id="booking-title"
          title="The system holds a slot. It never says “confirmed.”"
          lede="Staff confirm. Confirming without real access to the clinic's calendar would recreate the exact wait-time complaint this build exists to fix — a patient told 11:30 who is then made to wait."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="card">
            <p className="kicker">Outcome 1 · Slot open</p>
            <h3 className="mt-2 text-xl">Seat held, reference returned</h3>
            <p className="mt-3 text-sm leading-relaxed text-copy">
              The engine writes a hold to the schedule and gives the patient a reference. The
              patient is told the team will call to confirm. Nothing is promised that a person has
              not checked.
            </p>
            <div className="mt-5 rounded-lg border border-edge bg-base p-4">
              <p className="text-xs uppercase tracking-wider text-copy-muted">Hold reference</p>
              <p className="mt-1 font-mono text-lg text-copy">SSC-BK-06485281</p>
              <p className="mt-2 text-sm text-copy">
                &ldquo;Aapno slot hold thai gayo chhe. Team tamne call karse confirm karva.&rdquo;
              </p>
            </div>
          </article>

          <article className="card">
            <p className="kicker">Outcome 2 · Slot full</p>
            <h3 className="mt-2 text-xl">Up to three genuinely open alternatives</h3>
            <p className="mt-3 text-sm leading-relaxed text-copy">
              The engine reads the live schedule and returns real openings, not guesses. The patient
              picks one and the hold flow starts again. Verified in execution run #25.
            </p>
            <ul className="mt-5 space-y-2">
              {["Alternative 1", "Alternative 2", "Alternative 3"].map((label, i) => (
                <li
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-edge bg-base px-4 py-2.5 text-sm"
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

        <p className="mt-8 max-w-prose text-sm leading-relaxed text-copy">
          A third path exists and matters as much: if name or phone is missing, the engine refuses
          and the calendar is untouched (run #43). Slot words like &ldquo;evening&rdquo; are mapped
          to a slot in code, not by the model (run #47).
        </p>
      </div>
    </section>
  );
}
