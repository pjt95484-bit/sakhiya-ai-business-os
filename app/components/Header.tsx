"use client";

import { useState } from "react";
import { CLINIC, DISCLAIMER, NAV, PRODUCT_NAME, PRODUCT_TAGLINE } from "../lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div
        role="note"
        aria-label="Project disclaimer"
        className="border-b border-clay-500/20 bg-clay-100 text-clay-700"
      >
        <div className="container-site py-2 text-[13px] leading-snug">
          <span className="font-medium">Student capstone, not the clinic. </span>
          <span className="hidden sm:inline">
            Not affiliated with or endorsed by Sakhiya Skin Clinic. For real appointments visit{" "}
            <a href={CLINIC.site} className="underline underline-offset-2" rel="noopener noreferrer">
              {CLINIC.siteLabel}
            </a>{" "}
            or call{" "}
            <a href={CLINIC.tollFreeHref} className="underline underline-offset-2">
              {CLINIC.tollFree}
            </a>
            .
          </span>
          <span className="sm:hidden">
            For real appointments call{" "}
            <a href={CLINIC.tollFreeHref} className="underline underline-offset-2">
              {CLINIC.tollFree}
            </a>
            .
          </span>
          <span className="sr-only">{DISCLAIMER}</span>
        </div>
      </div>

      <div className="container-site flex items-center justify-between gap-4 py-3.5">
        <a href="#top" className="min-w-0">
          <span className="block truncate font-serif text-lg leading-tight text-ink">{PRODUCT_NAME}</span>
          <span className="hidden text-xs text-ink-mute sm:block">{PRODUCT_TAGLINE}</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-ink-soft hover:bg-white hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="btn-secondary px-3.5 py-2 md:hidden"
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
        className="border-t border-line bg-paper md:hidden"
      >
        <ul className="container-site grid grid-cols-2 gap-1 py-3">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:bg-white hover:text-ink"
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
