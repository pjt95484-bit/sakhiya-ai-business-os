import { FAILURES } from "../lib/site";

export function WhatBroke() {
  return (
    <section
      id="what-broke"
      aria-labelledby="broke-title"
      className="section border-t border-moss-900 bg-moss-900 text-moss-50"
    >
      <div className="container-site">
        <header className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-moss-200">11 — What broke</p>
          <h2 id="broke-title" className="mt-3 text-3xl leading-[1.1] text-white sm:text-4xl md:text-[2.75rem]">
            Seven things broke while building this. Here is each one, and the fix.
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-moss-100">
            This is the part of the site that earns trust. None of these were hidden from the mentor
            and none are hidden from you. The pattern across them decided how the final system is
            built.
          </p>
        </header>

        <ol className="mt-12 divide-y divide-moss-700 border-y border-moss-700">
          {FAILURES.map((f, i) => (
            <li key={i} className="grid gap-3 py-6 md:grid-cols-[3.5rem_1fr_1fr] md:gap-8">
              <span className="font-mono text-sm text-moss-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-moss-200">What broke</p>
                <p className="mt-1 leading-relaxed text-white">
                  {f.broke.split(/(nodeNotCovered|reply_script|gemini-2\.5-flash|#6)/).map((part, j) =>
                    /^(nodeNotCovered|reply_script|gemini-2\.5-flash|#6)$/.test(part) ? (
                      <code key={j} className="rounded bg-moss-800 px-1 py-0.5 font-mono text-[0.9em]">
                        {part}
                      </code>
                    ) : (
                      <span key={j}>{part}</span>
                    ),
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-moss-200">Fix</p>
                <p className="mt-1 leading-relaxed text-moss-50">
                  {f.fix.split(/(gemini-3\.6-flash)/).map((part, j) =>
                    part === "gemini-3.6-flash" ? (
                      <code key={j} className="rounded bg-moss-800 px-1 py-0.5 font-mono text-[0.9em]">
                        {part}
                      </code>
                    ) : (
                      <span key={j}>{part}</span>
                    ),
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <blockquote className="mt-14 max-w-3xl border-l-2 border-moss-200 pl-6">
          <p className="font-serif text-2xl leading-snug text-white sm:text-3xl">
            A prompt is a request. Code is a rule.
          </p>
          <p className="mt-4 leading-relaxed text-moss-100">
            The slot mapping was written into the prompt three times and ignored three times. Written
            once in code, it has not failed since. Anything that actually matters belongs in code, not
            in a prompt.
          </p>
        </blockquote>
      </div>
    </section>
  );
}
