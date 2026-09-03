"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { localeOptions, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/I18nProvider";

function LocaleIcon({ locale }: { locale: Locale }) {
  const option = localeOptions.find((item) => item.id === locale);
  if (!option) return null;

  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
      <Image
        src={option.icon.src}
        alt=""
        width={18}
        height={18}
        className="block h-[18px] w-[18px] object-contain object-center"
      />
    </span>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale, ui } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = localeOptions.find((item) => item.id === locale) ?? localeOptions[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1.5 border border-[#e8e8e8] bg-white px-2.5 text-ink transition hover:border-wine/40"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${ui.language}: ${current.label}`}
        onClick={() => setOpen((value) => !value)}
      >
        <LocaleIcon locale={current.id} />
        <span className="hidden text-xs tracking-wide sm:inline">{current.label}</span>
        <span aria-hidden className="text-[10px] text-ink/45">
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={ui.language}
          className="absolute right-0 z-50 mt-1 min-w-36 border border-[#e8e8e8] bg-white py-1 shadow-[0_12px_30px_rgba(22,20,18,0.12)]"
        >
          {localeOptions.map((option) => {
            const selected = option.id === locale;
            return (
              <li key={option.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-paper-dark ${
                    selected ? "text-wine" : "text-ink"
                  }`}
                  onClick={() => choose(option.id)}
                >
                  <LocaleIcon locale={option.id} />
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
