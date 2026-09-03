import Link from "next/link";
import { event } from "@/lib/event";

export function SiteHeader({
  ctaHref = "/register",
  ctaLabel = "参加申し込み",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="min-w-0">
          <p className="truncate font-serif text-sm tracking-wider text-navy">
            {event.schoolName}
          </p>
          <p className="text-[11px] tracking-[0.2em] text-gold">
            {event.cohortLabel} {event.reunionName}
          </p>
        </Link>
        <Link
          href={ctaHref}
          className="shrink-0 rounded-full bg-navy px-4 py-2 text-xs font-medium tracking-wide text-cream transition hover:bg-navy-deep sm:px-5 sm:text-sm"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-navy/10 bg-navy text-cream/80">
      <div className="mx-auto max-w-5xl px-5 py-10 text-center">
        <p className="font-serif text-lg text-cream">{event.schoolName}</p>
        <p className="mt-1 text-xs tracking-[0.25em] text-gold">
          {event.cohortLabel} {event.reunionName}
        </p>
        <p className="mt-6 text-xs leading-relaxed text-cream/60">
          {event.contactNote}
        </p>
      </div>
    </footer>
  );
}

export function GoldRule() {
  return (
    <div
      className="h-px w-full bg-linear-to-r from-transparent via-gold to-transparent"
      aria-hidden
    />
  );
}

export function MockBanner() {
  return (
    <div className="bg-navy px-4 py-2 text-center text-[11px] leading-relaxed text-cream/85 sm:text-xs">
      これはモックです。実メールの送信と Stripe
      での課金は行いません。認証コードは{" "}
      <span className="font-mono tracking-widest text-gold-light">123456</span>
    </div>
  );
}
