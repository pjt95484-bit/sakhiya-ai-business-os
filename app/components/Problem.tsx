import { CLINIC } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="section">
      <div className="container-site">
        <SectionHeading
          kicker="01 — The problem"
          id="problem-title"
          title="Sakhiya Skin Clinic does not have a lead problem. It has a slot problem."
          lede={
            <>
              With {CLINIC.rating} stars across roughly {CLINIC.reviews} Google reviews, demand is
              not the constraint. Reading the reviews surfaced a different pain: appointment and
              slot management. Every design decision in this system traces back to that.
            </>
          }
        />

        <div className="section-body grid gap-5 md:grid-cols-3">
          <article className="card">
            <p className="kicker">Wait time</p>
            <h3 className="mt-2 text-xl">An 11:30 appointment, seen after an hour</h3>
            <blockquote className="mt-4 border-l-2 border-neon pl-4 text-copy">
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
            <h3 className="mt-2 text-xl">Gujarati, typed in Roman letters</h3>
            <p className="mt-4 text-copy">
              Surat patients write{" "}
              <span className="font-mono text-[0.92em] text-neon">mane laser karvanu chhe</span>.
              Most systems read that as Hindi and reply in the wrong language. The patient notices
              immediately.
            </p>
          </article>

          <article className="card">
            <p className="kicker">After hours</p>
            <h3 className="mt-2 text-xl">Enquiries arrive at 11 PM</h3>
            <p className="mt-4 text-copy">
              The clinic is open {CLINIC.hours}. Enquiries do not keep those hours. An unanswered
              message at night is a lost patient by morning.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
