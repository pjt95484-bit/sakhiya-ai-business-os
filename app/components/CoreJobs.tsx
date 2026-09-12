import { SectionHeading } from "./SectionHeading";

const JOBS = [
  {
    n: "I",
    title: "Marketing & Content",
    body: "A weekly brief becomes five ad variations written for a Surat buyer persona, each self-checked against India healthcare ad rules and parked for human approval.",
    href: "#agent-ad-creative",
  },
  {
    n: "II",
    title: "Lead Capture & Sales",
    body: "Every enquiry — voice, chat or form — is logged, scored 0–100, tagged with its language and script, and routed. Hot leads trigger an instant alert.",
    href: "#agent-lead-qualification",
  },
  {
    n: "III",
    title: "Patient Support & Follow-up",
    body: "Sessions due within three days get a reminder each morning, written in the patient's own language, with a flag for anything a human should read first.",
    href: "#agent-follow-up",
  },
  {
    n: "IV",
    title: "Clinic Intelligence",
    body: "Everything lands in Google Sheets and a live Coefficient dashboard, so the team can see enquiry volume, language mix and hold references at a glance.",
    href: "#node-dashboard",
  },
];

export function CoreJobs() {
  return (
    <section aria-labelledby="jobs-title" className="section border-t border-edge bg-surface">
      <div className="container-site">
        <SectionHeading
          kicker="02 — The four core jobs"
          id="jobs-title"
          title="One system, four jobs a clinic front desk does every day."
        />
        {/* Part B5 — each cell is a real panel: surface fill plus an edge border. */}
        <ol className="section-body grid gap-5 sm:grid-cols-2">
          {JOBS.map((job) => (
            <li key={job.n} className="card card-hover">
              <p className="font-mono text-sm text-neon">{job.n}</p>
              <h3 className="mt-3 text-xl">{job.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-copy-muted">{job.body}</p>
              <div className="card-foot">
                <a href={job.href} className="link-accent inline-block py-1 text-sm font-medium">
                  See how it runs
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
