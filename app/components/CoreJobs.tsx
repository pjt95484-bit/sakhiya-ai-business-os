import { SectionHeading } from "./SectionHeading";

const JOBS = [
  {
    n: "01",
    title: "Marketing & Content",
    body: "One weekly brief becomes five ad variations, checked against India healthcare ad rules and held for a human to approve.",
    href: "#agent-ad-creative",
  },
  {
    n: "02",
    title: "Lead Capture & Sales",
    body: "Meera's message is logged, scored out of 100, and tagged with her language. A hot lead alerts the team at once.",
    href: "#agent-lead-qualification",
  },
  {
    n: "03",
    title: "Patient Support & Follow-up",
    body: "Sessions due within three days get a reminder each morning, written in the patient's own language.",
    href: "#agent-follow-up",
  },
  {
    n: "04",
    title: "Clinic Intelligence",
    body: "Every enquiry lands in a sheet and a live dashboard: volume, language mix, hold references.",
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
          title="Four jobs a front desk does every day."
          lede="One system covers all four, so nothing waits for someone to remember it."
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
