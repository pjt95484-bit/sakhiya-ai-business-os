import { BUILDER, CLINIC, DISCLAIMER, PRODUCT_NAME } from "../lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-site py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <p className="font-serif text-lg text-ink">{PRODUCT_NAME}</p>
            <p role="note" aria-label="Project disclaimer" className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft">
              {DISCLAIMER}
            </p>
          </div>

          <dl className="grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-1">
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-mute">Official clinic website</dt>
              <dd className="mt-1">
                <a
                  href={CLINIC.site}
                  rel="noopener noreferrer"
                  className="font-medium text-moss-700 underline underline-offset-4 hover:text-moss-900"
                >
                  {CLINIC.siteLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-mute">Toll free</dt>
              <dd className="mt-1">
                <a href={CLINIC.tollFreeHref} className="font-mono text-ink hover:underline">
                  {CLINIC.tollFree}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-mute">WhatsApp</dt>
              <dd className="mt-1">
                <a href={CLINIC.whatsappHref} rel="noopener noreferrer" className="font-mono text-ink hover:underline">
                  {CLINIC.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-mute">Vesu centre · hours</dt>
              <dd className="mt-1 text-ink-soft">{CLINIC.hours}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built by Sandeep &ldquo;{BUILDER.nickname}&rdquo; Tiwari · {BUILDER.course} · Mentor:{" "}
            {BUILDER.mentor}
          </p>
          <p>
            Site in English; the product itself handles Gujarati, Hindi and English.{" "}
            <a href="/llms.txt" className="underline underline-offset-2">
              llms.txt
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
