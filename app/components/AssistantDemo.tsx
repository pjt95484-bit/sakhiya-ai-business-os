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
          title="Talk to the assistant. It is live, and it will refuse the right things."
          lede="This is the same ElevenLabs agent the system runs on, not a mock. Type or speak in Gujarati, Hinglish or English. It will collect your details and hold a slot — it will not quote a price or tell you a treatment is safe."
        />

        <div
          id="assistant"
          className="mt-12 grid gap-8 scroll-mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div>
            <h3 className="text-xl">Three prompts to try</h3>
            <p className="mt-2 text-sm text-copy">
              Copy one and paste it into the assistant. The first is a normal enquiry. The last two
              are restriction tests — the assistant will refuse to quote a price or call anything
              safe.
            </p>
            <ol className="mt-4 space-y-2">
              {TEST_PROMPTS.map((p) => (
                <CopyPrompt key={p.text} text={p.text} />
              ))}
            </ol>
            <p className="mt-3 text-xs text-copy-muted">
              The assistant runs on the ElevenLabs platform. Conversations are test data for a
              student project; do not share real patient details.
            </p>
          </div>

          <div className="card flex flex-col justify-between">
            <div>
              <h3 className="text-xl">Open the assistant</h3>
              <p className="mt-2 text-sm text-copy">
                The chat launcher appears at the bottom-right corner of this page once it loads. If
                it does not appear, or you are on a phone, the direct link opens the same agent in a
                new tab.
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
