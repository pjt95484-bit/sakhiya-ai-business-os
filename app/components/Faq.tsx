import { FAQ } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="section border-t border-edge bg-surface"
    >
      <div className="container-site">
        <SectionHeading kicker="13 — Questions" id="faq-title" title="Questions" />
        <div className="section-body max-w-measure divide-y divide-edge border-y border-edge">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-medium text-copy [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-base font-medium tracking-normal">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 font-mono text-copy-muted group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 hidden font-mono text-copy-muted group-open:inline"
                >
                  −
                </span>
              </summary>
              <p className="mt-3 max-w-measure text-sm leading-relaxed text-copy">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
