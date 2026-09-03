"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FlowGuard } from "@/components/FlowGuard";
import { MockBanner, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { event } from "@/lib/event";
import { formatYen } from "@/lib/format";
import { getRegistration } from "@/lib/session";

function CompleteView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    const registration = getRegistration();
    setName(registration.name);
    setEmail(registration.email);
    setQuantity(registration.quantity || 1);
    setPaymentId(registration.paymentId ?? "");
  }, []);

  return (
    <div className="text-center">
      <p className="text-xs tracking-[0.25em] text-gold">COMPLETE</p>
      <h1 className="mt-2 font-serif text-2xl text-navy sm:text-3xl">
        お申し込みを受け付けました
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink/65">
        {name} さん、{event.reunionName} への参加登録（モック）が完了しました。
        本番では確認メールをお送りします。
      </p>
      <dl className="mt-8 space-y-3 rounded-2xl border border-navy/10 bg-white/80 px-5 py-6 text-left text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink/50">メール</dt>
          <dd className="text-navy">{email}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/50">人数</dt>
          <dd className="text-navy">{quantity} 名</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/50">会費</dt>
          <dd className="text-navy">{formatYen(event.fee * quantity)}</dd>
        </div>
        {paymentId ? (
          <div className="flex justify-between gap-4">
            <dt className="text-ink/50">決済ID（モック）</dt>
            <dd className="truncate font-mono text-xs text-navy">{paymentId}</dd>
          </div>
        ) : null}
      </dl>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-navy px-8 py-3.5 text-sm font-medium text-cream transition hover:bg-navy-deep"
      >
        トップへ戻る
      </Link>
    </div>
  );
}

export default function CompletePage() {
  return (
    <div className="paper-bg flex min-h-full flex-col">
      <MockBanner />
      <SiteHeader ctaHref="/" ctaLabel="トップへ" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-12">
        <FlowGuard require="verified">
          <CompleteView />
        </FlowGuard>
      </main>
      <SiteFooter />
    </div>
  );
}
