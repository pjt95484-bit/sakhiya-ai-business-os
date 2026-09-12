import { FAQ } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section border-t border-line bg-white">
      <div className="container-site">
        <SectionHeading
          kicker="13 — Questions"
          id="faq-title"
          title="Straight answers to the questions people ask about this build."
        />
        <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-medium text-ink [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-base font-medium tracking-normal">{item.q}</h3>
                <span aria-hidden="true" className="mt-1 font-mono text-ink-mute group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="mt-1 hidden font-mono text-ink-mute group-open:inline">
                  −
                </span>
              </summary>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
