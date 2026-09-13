import { CLINIC } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="section">
      <div className="container-site">
        <SectionHeading
          kicker="01 — The problem"
          id="problem-title"
          title={
            <>
              This clinic does not have a lead problem. It has a{" "}
              <span className="text-neon">slot problem</span>.
            </>
          }
          lede={
            <>
              {CLINIC.rating} stars across roughly {CLINIC.reviews} Google reviews. Patients are not
              the constraint — getting them seen on time is.
            </>
          }
        />

        <div className="section-body grid gap-5 md:grid-cols-3">
          <article className="card">
            <p className="kicker">Wait time</p>
            <h3 className="mt-3 text-xl">Booked for 11:30. Seen an hour later.</h3>
            <blockquote className="mt-4 border-l-2 border-neon-dim pl-4 text-copy-muted">
              <p>
                &ldquo;&hellip;very unprofessional&hellip; very badly managed.&rdquo; The reviewer
                describes an 11:30 appointment at the Vesu branch where they waited over an hour
                while staff filmed a promotional reel.
              </p>
            </blockquote>
            <p className="card-foot text-xs text-copy-muted">
              Paraphrased and briefly quoted from a publicly posted Google review of the Vesu
              centre. Not verified independently by this project.
            </p>
          </article>

          <article className="card">
            <p className="kicker">Language</p>
            <h3 className="mt-3 text-xl">Gujarati, typed in English letters</h3>
            <p className="mt-4 text-copy-muted">
              Meera types{" "}
              <span className="font-mono text-[0.92em] text-neon">mane laser karvanu chhe</span>.
              Most systems read that as Hindi and answer wrong. She notices at once.
            </p>
          </article>

          <article className="card">
            <p className="kicker">After hours</p>
            <h3 className="mt-3 text-xl">Her message arrives at 11 PM</h3>
            <p className="mt-4 text-copy-muted">
              The clinic is open {CLINIC.hours}. By morning she has booked elsewhere.
            </p>
          </article>
        </div>

        <p className="mt-6 text-xs text-copy-muted">
          Meera is an illustration used through this page to follow one enquiry. She is not a real
          patient.
        </p>
      </div>
    </section>
  );
}
