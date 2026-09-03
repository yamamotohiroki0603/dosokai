"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";

function sectionId(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

function useActiveSection(
  items: readonly { href: string }[],
  enabled: boolean,
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = items.map((item) => item.href).join("|");
  const lockUntilRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const ids = idsKey
      .split("|")
      .map((href) => sectionId(href))
      .filter(Boolean);

    function probeY() {
      const header = document.querySelector("header");
      const headerHeight = header?.getBoundingClientRect().height ?? 96;
      const sample = document.querySelector("section[id]");
      const margin = sample
        ? Number.parseFloat(getComputedStyle(sample).scrollMarginTop) || 0
        : 0;
      return Math.max(headerHeight, margin) + 16;
    }

    function readActive() {
      if (Date.now() < lockUntilRef.current) return;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node));

      if (!sections.length) {
        setActiveId(null);
        return;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const probe = probeY();
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= probe) {
          current = section.id;
        }
      }
      setActiveId(current);
    }

    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        readActive();
      });
    }

    readActive();
    const delayed = window.setTimeout(readActive, 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", readActive);
    window.addEventListener("resize", readActive);
    return () => {
      window.clearTimeout(delayed);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", readActive);
      window.removeEventListener("resize", readActive);
    };
  }, [enabled, idsKey]);

  function markActive(id: string) {
    lockUntilRef.current = Date.now() + 800;
    setActiveId(id);
  }

  return [activeId, markActive] as const;
}

export function SiteHeader({
  ctaHref = "#overview",
  ctaLabel,
  showCta = true,
  showNav = false,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
  showNav?: boolean;
}) {
  const { event, ui } = useI18n();
  const resolvedCtaLabel = ctaLabel ?? ui.apply;
  const isHash = ctaHref.startsWith("#");
  const CtaTag = isHash ? "a" : Link;
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const [activeId, setActiveId] = useActiveSection(event.nav, showNav);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeNav() {
    setOpen(false);
  }

  function navItemClass(href: string, compact: boolean) {
    const active = activeId === sectionId(href);
    if (compact) {
      return `border-b-2 text-[11px] tracking-[0.12em] transition ${
        active
          ? "border-wine text-wine"
          : "border-transparent text-ink/70 hover:text-wine"
      }`;
    }
    return `block border-b-2 py-3 text-sm tracking-wide transition ${
      active
        ? "border-wine text-wine"
        : "border-transparent text-ink hover:text-wine"
    }`;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-x-4 px-5">
        <Link href="/" className="flex min-w-0 items-center gap-3 py-3">
          <Image
            src="/brand/h-logo.png"
            alt={event.schoolName}
            width={299}
            height={39}
            className="h-8 w-auto sm:h-9"
            priority
          />
          <span className="hidden border-l border-[#ddd] pl-3 text-xs tracking-wide text-wine sm:block">
            {event.reunionName}
          </span>
        </Link>
        <div className="flex items-center gap-2 py-3 sm:gap-3">
          <LanguageSwitcher />
          {showNav ? (
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-[#e8e8e8] text-ink lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? ui.menuClose : ui.menuOpen}
              onClick={() => setOpen((current) => !current)}
            >
              <span className="sr-only">{open ? ui.close : ui.menu}</span>
              <span aria-hidden className="flex flex-col gap-1.5">
                <span
                  className={`block h-px w-4 bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-4 bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          ) : null}
          {showCta ? (
            <CtaTag
              href={ctaHref}
              className="shrink-0 rounded-full bg-wine px-5 py-2 text-xs font-medium tracking-wide text-white transition hover:bg-wine-deep sm:text-sm"
            >
              {resolvedCtaLabel}
            </CtaTag>
          ) : null}
        </div>
        {showNav ? (
          <nav
            className="col-span-2 hidden flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#e8e8e8] py-2.5 lg:flex"
            aria-label={ui.navAria}
          >
            {event.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={navItemClass(item.href, true)}
                aria-current={activeId === sectionId(item.href) ? "location" : undefined}
                onClick={() => setActiveId(sectionId(item.href))}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
      {showNav && open ? (
        <nav
          id={menuId}
          className="border-t border-[#e8e8e8] bg-white lg:hidden"
          aria-label={ui.navAria}
        >
          <ul className="mx-auto max-h-[min(70vh,32rem)] max-w-6xl overflow-y-auto px-5 py-3">
            {event.nav.map((item) => (
              <li key={item.href} className="border-b border-[#f0f0f0] last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => {
                    setActiveId(sectionId(item.href));
                    closeNav();
                  }}
                  className={navItemClass(item.href, false)}
                  aria-current={activeId === sectionId(item.href) ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
