"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

export { SiteHeader } from "@/components/SiteHeader";

export function SiteFooter() {
  const { event } = useI18n();
  return (
    <footer className="bg-johoku-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 text-center">
        <p className="font-serif text-lg tracking-[0.12em] text-white">
          {event.schoolName}
        </p>
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
