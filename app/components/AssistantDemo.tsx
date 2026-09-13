"use client";

import Script from "next/script";
import { useState } from "react";
import { ELEVENLABS_AGENT_ID, ELEVENLABS_TALK_URL, TEST_PROMPTS } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

function CopyPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions). The text
      // is still selectable, so there is nothing else to do.
    }
  }

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-edge bg-surface px-3.5 py-2.5">
      <code className="font-mono text-sm text-copy">{text}</code>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-edge px-3 py-1 text-xs font-medium text-copy hover:border-neon hover:text-copy"
        aria-live="polite"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
}

export function AssistantDemo() {
  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="section border-t border-edge bg-surface"
    >
      <div className="container-site">
        <SectionHeading
          kicker="04 — Live demo · Assistant"
          id="demo-title"
          title="Who answers her."
          lede="The live agent, not a mock. It takes her details and holds a slot. It will not quote a price or call a treatment safe."
        />

        <div
          id="assistant"
          className="section-body grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div>
            <h3 className="text-xl">Three prompts to try</h3>
            <p className="mt-2 text-sm text-copy-muted">
              Copy one in. The first is Meera&rsquo;s enquiry. The last two are traps — the
              assistant should refuse both.
            </p>
            <ol className="mt-4 space-y-2">
              {TEST_PROMPTS.map((p) => (
                <CopyPrompt key={p.text} text={p.text} />
              ))}
            </ol>
            <p className="mt-3 text-xs text-copy-muted">
              Runs on ElevenLabs. Test data only — do not share real patient details.
            </p>
          </div>

          <div className="card flex flex-col justify-between">
            <div>
              <h3 className="text-xl">Open the assistant</h3>
              <p className="mt-2 text-sm text-copy-muted">
                The launcher sits bottom-right once it loads. On a phone, or if it does not appear,
                the link opens the same agent in a new tab.
              </p>
              <a
                href={ELEVENLABS_TALK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5"
              >
                Talk to the assistant in a new tab
              </a>
              <p className="mt-4 break-all font-mono text-xs text-copy-muted">
                Agent ID: {ELEVENLABS_AGENT_ID}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-edge pt-5">
              <div>
                <dt className="text-xs uppercase tracking-wider text-copy-muted">Conversations</dt>
                <dd className="mt-1 text-3xl">9</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-copy-muted">Success rate</dt>
                <dd className="mt-1 text-3xl">100%</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Official ElevenLabs embed. The custom element renders a floating launcher. */}
        <elevenlabs-convai agent-id={ELEVENLABS_AGENT_ID}></elevenlabs-convai>
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="lazyOnload"
          type="text/javascript"
        />
      </div>
    </section>
  );
}
