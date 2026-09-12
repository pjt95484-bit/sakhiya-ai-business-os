"use client";

import { useEffect, useRef, useState } from "react";
import { CLINIC, FORM_OPTIONS, N8N_LEAD_WEBHOOK } from "../lib/site";
import { SectionHeading } from "./SectionHeading";

type Status = "idle" | "submitting" | "success" | "error";

type Payload = {
  patient_name: string;
  phone: string;
  concern: string;
  centre: string;
  visit_timeline: string;
  time_slot: string;
  language: string;
  message: string;
};

const EMPTY: Payload = {
  patient_name: "",
  phone: "",
  concern: "",
  centre: "",
  visit_timeline: "",
  time_slot: "",
  language: "",
  message: "",
};

/** Case-insensitive lookup of the first present key, searching one level of nesting. */
function pick(obj: unknown, keys: string[]): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const entries = Object.entries(obj as Record<string, unknown>);
  for (const key of keys) {
    const hit = entries.find(([k]) => k.toLowerCase() === key.toLowerCase());
    if (hit && hit[1] !== null && hit[1] !== undefined && typeof hit[1] !== "object") {
      return String(hit[1]);
    }
  }
  for (const [, v] of entries) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const nested = pick(v, keys);
      if (nested) return nested;
    }
  }
  return undefined;
}

function Select({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: keyof Payload;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="label">
        {label}
      </label>
      <select
        id={`f-${name}`}
        name={name}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function EnquiryForm() {
  const [data, setData] = useState<Payload>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<unknown>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof Payload) => (v: string) => setData((d) => ({ ...d, [k]: v }));

  useEffect(() => {
    if (status !== "submitting") return;
    setElapsed(0);
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    if (status === "success" || status === "error") {
      resultRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\d{10}$/.test(data.phone.trim())) {
      setErrorMsg("Phone number must be exactly 10 digits.");
      setStatus("error");
      return;
    }

    // `message` is sent exactly as typed — no trim, translate, autocorrect or
    // normalise. The n8n agent detects the patient's language from that raw text.
    const body: Payload = {
      ...data,
      patient_name: data.patient_name.trim(),
      phone: data.phone.trim(),
    };

    setStatus("submitting");
    setResult(null);
    setErrorMsg("");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90_000);

    try {
      const res = await fetch(N8N_LEAD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      const text = await res.text();
      let parsed: unknown = text;
      try {
        parsed = JSON.parse(text);
      } catch {
        // Not JSON — show the raw text.
      }
      setResult(parsed);
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error && err.name === "AbortError"
          ? "The workflow took longer than 90 seconds and the request was stopped."
          : "The enquiry could not reach the workflow.",
      );
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  const submitting = status === "submitting";

  const score = pick(result, ["lead_score", "score"]);
  const temp = pick(result, [
    "lead_status",
    "temperature",
    "lead_temperature",
    "status",
    "priority",
    "category",
  ]);
  const language = pick(result, ["detected_language", "language"]);
  const script = pick(result, ["detected_script", "script"]);
  const reply = pick(result, [
    "reply",
    "reply_script",
    "reply_text",
    "suggested_reply",
    "response",
  ]);
  const reference = pick(result, ["booking_reference", "reference", "hold_reference", "ref"]);
  const hasSummary = Boolean(score || temp || language || script || reply || reference);
  // The workflow's last node is the Gmail alert, so a successful run can come
  // back as a sent-message id rather than the scoring JSON. That id is proof the
  // Hot-lead alert went out, so say so instead of printing a bare id.
  const alertSent = !hasSummary && Boolean(pick(result, ["threadId"]));

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="section border-t border-edge">
      <div className="container-site">
        <SectionHeading
          kicker="05 — Live demo · Enquiry form"
          id="enquiry-title"
          title="Submit a test enquiry and watch it get scored."
          lede="This form posts to the live n8n workflow. A Gemini agent reads your message, scores it 0–100, and detects language and script from what you typed — not from the dropdown. Expect a 20–40 second wait."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <form
            onSubmit={onSubmit}
            className="card space-y-5"
            aria-describedby="privacy-note"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-patient_name" className="label">
                  Name
                </label>
                <input
                  id="f-patient_name"
                  name="patient_name"
                  type="text"
                  required
                  autoComplete="off"
                  value={data.patient_name}
                  onChange={(e) => set("patient_name")(e.target.value)}
                  className="field"
                  placeholder="Test name"
                />
              </div>
              <div>
                <label htmlFor="f-phone" className="label">
                  Phone <span className="font-normal text-copy-muted">(10 digits)</span>
                </label>
                <input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                  autoComplete="off"
                  value={data.phone}
                  onChange={(e) => set("phone")(e.target.value.replace(/\D/g, ""))}
                  className="field"
                  placeholder="9999999999"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                name="concern"
                label="Concern"
                options={FORM_OPTIONS.concern}
                value={data.concern}
                onChange={set("concern")}
              />
              <Select
                name="centre"
                label="Centre"
                options={FORM_OPTIONS.centre}
                value={data.centre}
                onChange={set("centre")}
              />
              <Select
                name="visit_timeline"
                label="When do you want to visit?"
                options={FORM_OPTIONS.visit_timeline}
                value={data.visit_timeline}
                onChange={set("visit_timeline")}
              />
              <Select
                name="time_slot"
                label="Preferred time"
                options={FORM_OPTIONS.time_slot}
                value={data.time_slot}
                onChange={set("time_slot")}
              />
              <Select
                name="language"
                label="Language (dropdown)"
                options={FORM_OPTIONS.language}
                value={data.language}
                onChange={set("language")}
              />
            </div>

            <div>
              <label htmlFor="f-message" className="label">
                Your message, in your own words
              </label>
              <textarea
                id="f-message"
                name="message"
                required
                rows={4}
                value={data.message}
                onChange={(e) => set("message")(e.target.value)}
                className="field"
                placeholder="mane unwanted hair ni laser treatment karvani chhe"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
              />
              <p className="mt-1.5 text-xs text-copy-muted">
                Sent exactly as typed. Try Roman-script Gujarati with the dropdown set to English.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? "Scoring your enquiry…" : "Send test enquiry"}
              </button>
              {submitting ? (
                <span
                  className="font-mono text-sm text-copy-muted"
                  role="status"
                  aria-live="polite"
                >
                  {elapsed}s · Gemini agent running, usually 20–40s
                </span>
              ) : null}
            </div>

            <p id="privacy-note" className="border-t border-edge pt-4 text-xs text-copy-muted">
              This form sends data to a live demo workflow. Please use test details, not real
              patient information.
            </p>
          </form>

          <div ref={resultRef} className="scroll-mt-28" aria-live="polite">
            {status === "idle" ? (
              <div className="card h-full border-dashed">
                <p className="kicker">What comes back</p>
                <p className="mt-3 text-sm leading-relaxed text-copy">
                  The result card shows the last node&rsquo;s JSON from the workflow: a score,
                  whether the lead is Hot, and the language and script the agent detected from your
                  message. The row also lands in a Google Sheet.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-copy">
                  Nothing spins silently. While the agent is thinking you will see a live counter.
                </p>
              </div>
            ) : null}

            {status === "submitting" ? (
              <div className="card h-full">
                <p className="kicker">In flight</p>
                <h3 className="mt-3 text-xl">Scoring your enquiry…</h3>
                <p className="mt-3 text-sm leading-relaxed text-copy">
                  The webhook has your message. A Gemini agent is reading it, scoring it and
                  deciding which language to reply in. This takes 20–40 seconds because the model
                  runs for real.
                </p>
                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-edge">
                  <div
                    className="h-full bg-neon transition-[width] duration-1000 ease-linear"
                    style={{ width: `${Math.min(95, (elapsed / 40) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs text-copy-muted">{elapsed}s elapsed</p>
              </div>
            ) : null}

            {status === "success" ? (
              <div className="card h-full border-edge bg-raised">
                <p className="kicker">Result</p>
                <h3 className="mt-3 text-xl">
                  {hasSummary
                    ? "Enquiry received and scored."
                    : "Enquiry received. The workflow ran."}
                </h3>
                {alertSent ? (
                  <p className="mt-3 text-sm leading-relaxed text-copy">
                    The agent scored your enquiry, detected its language and script, logged the row,
                    and sent the staff alert — the workflow answers with the id of that alert email,
                    which is why you see a message id below rather than the score. The score itself
                    lands in the Google Sheet alongside the detected language.
                  </p>
                ) : null}
                {hasSummary ? (
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {score ? (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-copy-muted">Score</dt>
                        <dd className="mt-0.5 text-2xl">{score}</dd>
                      </div>
                    ) : null}
                    {temp ? (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-copy-muted">Status</dt>
                        <dd className="mt-0.5 text-2xl">{temp}</dd>
                      </div>
                    ) : null}
                    {language ? (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-copy-muted">
                          Language
                        </dt>
                        <dd className="mt-0.5 font-medium">{language}</dd>
                      </div>
                    ) : null}
                    {script ? (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-copy-muted">Script</dt>
                        <dd className="mt-0.5 font-medium">{script}</dd>
                      </div>
                    ) : null}
                    {reference ? (
                      <div className="col-span-2">
                        <dt className="text-xs uppercase tracking-wider text-copy-muted">
                          Reference
                        </dt>
                        <dd className="mt-0.5 font-mono">{reference}</dd>
                      </div>
                    ) : null}
                    {reply ? (
                      <div className="col-span-2">
                        <dt className="text-xs uppercase tracking-wider text-copy-muted">
                          Suggested reply
                        </dt>
                        <dd className="mt-0.5 leading-relaxed">{reply}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer text-copy">
                    Raw response from the last n8n node
                  </summary>
                  <pre className="mt-2 max-h-72 overflow-auto rounded-lg bg-surface p-3 font-mono text-xs leading-relaxed text-copy">
                    {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
                  </pre>
                </details>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setResult(null);
                  }}
                  className="btn-secondary mt-5"
                >
                  Send another
                </button>
              </div>
            ) : null}

            {status === "error" ? (
              <div className="card h-full border-edge bg-raised">
                <p className="kicker text-neon">Could not score</p>
                <h3 className="mt-3 text-xl">Something went wrong on the way to the workflow.</h3>
                <p className="mt-3 text-sm leading-relaxed text-copy">{errorMsg}</p>
                <p className="mt-3 text-sm leading-relaxed text-copy">
                  This is a student demo, so it can be down. For a real appointment, call the clinic
                  toll free on{" "}
                  <a
                    href={CLINIC.tollFreeHref}
                    className="font-medium underline underline-offset-2"
                  >
                    {CLINIC.tollFree}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-secondary mt-5"
                >
                  Try again
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
