import Link from "next/link";
import { event } from "@/lib/event";
import { formatYen } from "@/lib/format";
import { GoldRule, SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function Home() {
  return (
    <div className="paper-bg flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="px-5 pb-16 pt-14 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs tracking-[0.35em] text-gold sm:text-sm">
              {event.cohortLabel}
            </p>
            <h1 className="mt-4 font-serif text-[2rem] leading-tight text-navy sm:text-5xl">
              {event.schoolName}
              <span className="mt-2 block text-[1.65rem] sm:text-4xl">
                {event.reunionName}
              </span>
            </h1>
            <div className="mx-auto my-8 max-w-xs">
              <GoldRule />
            </div>
            <p className="font-serif text-lg text-ink/80 sm:text-xl">
              {event.tagline}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ink/60">
              開催概要は仮の文言です。決まり次第、このページを更新します。
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center rounded-full bg-navy px-8 py-3.5 text-sm font-medium tracking-wide text-cream transition hover:bg-navy-deep sm:w-auto"
              >
                参加申し込みへ
              </Link>
              <a
                href="#overview"
                className="inline-flex w-full items-center justify-center rounded-full border border-navy/20 px-8 py-3.5 text-sm text-navy transition hover:border-gold hover:text-navy sm:w-auto"
              >
                開催概要を見る
              </a>
            </div>
          </div>
        </section>

        <section id="overview" className="px-5 pb-20">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "日時", value: event.dateLabel, sub: event.timeLabel },
              {
                label: "会場",
                value: event.venueName,
                sub: event.venueAddress,
              },
              {
                label: "会費",
                value: formatYen(event.fee),
                sub: event.feeNote,
              },
              {
                label: "申込期限",
                value: event.rsvpDeadline,
                sub: `定員 ${event.capacity} 名`,
              },
            ].map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-navy/10 bg-white/70 p-5 shadow-[0_8px_30px_rgba(27,42,74,0.04)]"
              >
                <p className="text-[11px] tracking-[0.25em] text-gold">
                  {item.label}
                </p>
                <p className="mt-2 font-serif text-lg text-navy">{item.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/55">
                  {item.sub}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-serif text-2xl text-navy sm:text-3xl">
              当日の流れ
            </h2>
            <div className="mx-auto my-6 max-w-24">
              <GoldRule />
            </div>
            <ol className="divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white/70">
              {event.program.map((item) => (
                <li
                  key={item.time}
                  className="flex items-baseline gap-6 px-5 py-4 sm:px-8"
                >
                  <span className="w-16 shrink-0 font-mono text-sm text-gold">
                    {item.time}
                  </span>
                  <span className="text-sm text-navy sm:text-base">
                    {item.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-serif text-2xl text-navy sm:text-3xl">
              参加のステップ
            </h2>
            <p className="mt-3 text-center text-sm text-ink/60">
              メール認証のあと、会費を Stripe でお支払いいただきます。
            </p>
            <div className="mx-auto my-6 max-w-24">
              <GoldRule />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {event.steps.map((step) => (
                <article
                  key={step.n}
                  className="rounded-2xl border border-navy/10 bg-navy p-6 text-cream"
                >
                  <p className="font-mono text-xs tracking-[0.2em] text-gold-light">
                    STEP {step.n}
                  </p>
                  <h3 className="mt-3 font-serif text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-serif text-2xl text-navy sm:text-3xl">
              よくある質問
            </h2>
            <div className="mx-auto my-6 max-w-24">
              <GoldRule />
            </div>
            <div className="space-y-3">
              {event.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-2xl border border-navy/10 bg-white/70 px-5 py-4"
                >
                  <summary className="cursor-pointer text-sm font-medium text-navy">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24">
          <div className="mx-auto max-w-3xl rounded-3xl bg-navy px-6 py-12 text-center text-cream sm:px-12">
            <p className="text-xs tracking-[0.3em] text-gold-light">
              {event.cohortLabel}
            </p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
              顔を合わせる日を、先に確保しませんか
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/70">
              申し込みはメール認証のあと、会費のお支払いです。いまはモックのため課金は発生しません。
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-navy-deep transition hover:bg-gold-light"
            >
              参加申し込みをはじめる
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
