import { FAILURES } from "../lib/site";

const CODE = /(nodeNotCovered|reply_script|gemini-2\.5-flash|gemini-3\.6-flash|#6)/;

function WithCode({ text }: { text: string }) {
  return (
    <>
      {text.split(CODE).map((part, i) =>
        CODE.test(part) && part.length > 1 ? (
          <code
            key={i}
            className="rounded border border-edge bg-ground px-1.5 py-0.5 font-mono text-[0.85em] text-neon"
          >
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * The failure log is the section that earns trust, so it is styled to read as a
 * different kind of document from the rest of the page: a raised surface, a
 * monospace log rail, and neon status labels instead of prose cards.
 */
export function WhatBroke() {
  return (
    <section
      id="what-broke"
      aria-labelledby="broke-title"
      className="section border-y-2 border-neon-dim/50 bg-surface"
    >
      <div className="container-site">
        <header>
          <p className="kicker">11 — What broke</p>
          <h2 id="broke-title" className="h2">
            Seven things broke. Here is each one, and the fix.
          </h2>
          <p className="lede">
            Nothing here is hidden. The pattern across these seven decided how the finished system
            is built.
          </p>
        </header>

        <ol className="section-body overflow-hidden rounded-xl border border-edge bg-ground">
          {FAILURES.map((f, i) => (
            <li
              key={i}
              className="grid gap-x-8 gap-y-3 border-t border-edge p-5 first:border-t-0 sm:p-6 md:grid-cols-[3rem_1fr_1fr]"
            >
              <span className="font-mono text-sm text-neon">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-copy-muted">
                  Broke
                </p>
                <p className="mt-1.5 leading-relaxed text-copy">
                  <WithCode text={f.broke} />
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-neon">Fixed</p>
                <p className="mt-1.5 leading-relaxed text-copy-muted">
                  <WithCode text={f.fix} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        <blockquote className="section-body max-w-measure">
          <p className="text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-copy sm:text-4xl">
            A prompt is a <span className="text-neon">request</span>. Code is a{" "}
            <span className="text-neon">rule</span>.
          </p>
          <p className="mt-5 leading-relaxed text-copy-muted">
            The slot mapping was written into the prompt three times and ignored three times.
            Written once in code, it has not failed since. Anything that actually matters belongs in
            code, not in a prompt.
          </p>
        </blockquote>
      </div>
    </section>
  );
}
