"use client";

import { useState } from "react";
import { CLINIC, DISCLAIMER, NAV, PRODUCT_NAME, PRODUCT_TAGLINE } from "../lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-ground/85 backdrop-blur">
      {/* Legal disclaimer. Every word of DISCLAIMER is present: the visible line
          carries it across breakpoints and the sr-only span holds it verbatim. */}
      <div
        role="note"
        aria-label="Project disclaimer"
        className="border-b border-neon-dim/60 bg-surface"
      >
        <div className="container-site flex items-baseline gap-x-2 py-1.5 text-[12px] leading-snug text-copy-muted">
          <span className="font-mono uppercase tracking-[0.12em] text-neon">Not the clinic</span>
          <span className="hidden sm:inline">
            Independent student capstone. Not affiliated with or endorsed by Sakhiya Skin Clinic.
            For real appointments visit{" "}
            <a
              href={CLINIC.site}
              className="text-copy underline underline-offset-2"
              rel="noopener noreferrer"
            >
              {CLINIC.siteLabel}
            </a>{" "}
            or call{" "}
            <a href={CLINIC.tollFreeHref} className="text-copy underline underline-offset-2">
              {CLINIC.tollFree}
            </a>
            .
          </span>
          <span className="sm:hidden">
            Student project. Real appointments:{" "}
            <a href={CLINIC.tollFreeHref} className="text-copy underline underline-offset-2">
              {CLINIC.tollFree}
            </a>
            .
          </span>
          <span className="sr-only">{DISCLAIMER}</span>
        </div>
      </div>

      <div className="container-site flex items-center justify-between gap-4 py-3">
        <a href="#top" className="min-w-0">
          <span className="block truncate text-[15px] font-bold leading-tight tracking-tight text-copy">
            {PRODUCT_NAME}
          </span>
          <span className="hidden text-[11px] text-copy-muted sm:block">{PRODUCT_TAGLINE}</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-0.5 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-copy-muted transition-colors hover:bg-raised hover:text-neon"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="btn-secondary px-4 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Sections"
        hidden={!open}
        className="border-t border-edge bg-surface md:hidden"
      >
        <ul className="container-site grid grid-cols-2 gap-1 py-3">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-copy-muted hover:bg-raised hover:text-neon"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
