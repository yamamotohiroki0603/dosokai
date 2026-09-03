import Image from "next/image";
import Link from "next/link";
import { event } from "@/lib/event";

export function SiteHeader({
  ctaHref = "#overview",
  ctaLabel = "開催概要",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const isHash = ctaHref.startsWith("#");
  const CtaTag = isHash ? "a" : Link;

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
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
        <CtaTag
          href={ctaHref}
          className="shrink-0 rounded-full bg-wine px-5 py-2 text-xs font-medium tracking-wide text-white transition hover:bg-wine-deep sm:text-sm"
        >
          {ctaLabel}
        </CtaTag>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-johoku-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 text-center">
        <Image
          src="/brand/f-logo.png"
          alt={event.schoolName}
          width={231}
          height={30}
          className="mx-auto h-7 w-auto"
        />
        <p className="mt-3 text-xs tracking-[0.18em] text-white/70">
          {event.reunionName}
        </p>
        <p className="mt-6 text-xs leading-relaxed text-white/55">
          {event.contactOrg}
          <br />
          TEL {event.tel} / FAX {event.fax}
          <br />
          {event.email}
        </p>
      </div>
    </footer>
  );
}

export function GoldRule() {
  return <div className="mx-auto h-[3px] w-12 bg-wine" aria-hidden />;
}

export function MockBanner() {
  return (
    <div className="bg-wine px-4 py-2 text-center text-[11px] leading-relaxed text-white/90 sm:text-xs">
      これは申し込み画面のモックです。実メールの送信と Stripe
      での課金は行いません。認証コードは{" "}
      <span className="font-mono tracking-widest">123456</span>
    </div>
  );
}
