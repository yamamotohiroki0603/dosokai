"use client";

import Image from "next/image";
import { useId, useRef, type ReactNode } from "react";
import { formatYen } from "@/lib/format";
import { AlumnusProfileDialog } from "@/components/AlumnusProfile";
import { PaymentMethods } from "@/components/PaymentMethods";
import { PhotoAlbum } from "@/components/PhotoAlbum";
import { ProgramTimeline } from "@/components/ProgramTimeline";
import { GoldRule, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { useI18n } from "@/lib/i18n/I18nProvider";

function SectionTitle({
  kicker,
  children,
}: {
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker ? (
        <p className="text-xs tracking-[0.3em] text-wine">{kicker}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold tracking-wide text-ink sm:text-3xl">
        {children}
      </h2>
      <div className="mx-auto my-6 max-w-24">
        <GoldRule />
      </div>
    </div>
  );
}

export function LandingPage({
  heroSrc = "/images/gallery/life-01.jpg",
  heroAlt = "広島城北中・高等学校のキャンパス",
}: {
  heroSrc?: string;
  heroAlt?: string;
}) {
  const { event, ui } = useI18n();
  const shopDialogRef = useRef<HTMLDialogElement>(null);
  const shopTitleId = useId();
  return (
    <div className="paper-bg flex min-h-full flex-col">
      <SiteHeader showNav ctaHref="#apply" ctaLabel={ui.apply} />
      <main className="flex-1">
        <section className="relative isolate min-h-[70vh] overflow-hidden">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-johoku-dark/55" />
          <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-5 py-16 text-white sm:py-20">
            <Image
              src="/brand/mark.png"
              alt=""
              width={54}
              height={50}
              className="mb-6 h-10 w-auto"
            />
            <p className="text-xs tracking-[0.28em] text-white/80">
              {event.schoolNameEn}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              {event.catchphrase}
              <span className="mt-2 block text-2xl font-medium sm:text-3xl">
                {event.reunionName}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {event.tagline}
              <br />
              {event.subTagline}
            </p>
            <p className="mt-6 text-lg font-medium">
              {event.dateLabel}
              <span className="mt-1 block text-sm font-normal text-white/75">
                {event.timeLabel}
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#stories"
                className="inline-flex items-center justify-center rounded-full bg-wine px-8 py-3.5 text-sm font-medium text-white transition hover:bg-wine-deep"
              >
                {ui.heroJoin}
              </a>
              <a
                href="#teachers"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3.5 text-sm text-white transition hover:bg-white/10"
              >
                {ui.heroTeachers}
              </a>
              <a
                href="#live"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3.5 text-sm text-white transition hover:bg-white/10"
              >
                {ui.heroLive}
              </a>
            </div>
          </div>
        </section>

        <section id="guide" className="bg-paper-dark px-5 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
            <div className="mx-auto w-full max-w-sm overflow-hidden border border-[#e8e8e8] bg-white shadow-sm">
              <Image
                src="/images/flyer.jpg"
                alt={ui.flyerAlt(event.schoolName, event.reunionName)}
                width={1054}
                height={1492}
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-wine">GUIDE</p>
              <p className="mt-2 text-sm tracking-wide text-wine">
                {event.schoolName}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                {ui.guideHeld(event.dateLabel, event.venueName)}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {ui.guideBody}
              </p>
            </div>
          </div>
        </section>


        <section id="overview" className="px-5 py-20">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: ui.overviewDate, value: event.dateLabel, sub: event.timeLabel },
              {
                label: ui.overviewVenue,
                value: event.venueName,
                sub: event.venueAddress,
              },
              {
                label: ui.overviewFee,
                value: ui.overviewFeeValue(formatYen(event.fee)),
                sub: ui.overviewFeeSub(formatYen(event.feeOnSite)),
              },
            ].map((item) => (
              <article
                key={item.label}
                className="border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_30px_rgba(22,20,18,0.05)]"
              >
                <p className="text-[11px] tracking-[0.25em] text-wine">
                  {item.label}
                </p>
                <p className="mt-3 text-xl text-ink">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/55">
                  {item.sub}
                </p>
              </article>
            ))}
            <a
              href="#live"
              className="border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_30px_rgba(22,20,18,0.05)] transition hover:border-wine/40"
            >
              <p className="text-[11px] tracking-[0.25em] text-wine">
                {ui.overviewLive}
              </p>
              <p className="mt-3 text-xl text-ink">{ui.overviewLiveValue}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink/55">
                {ui.overviewLiveSub}
              </p>
            </a>
          </div>
        </section>

        <section id="teachers" className="px-5 pb-20">
          <div className="mx-auto max-w-6xl bg-johoku-dark px-5 py-14 text-white sm:px-10">
            <p className="text-center text-xs tracking-[0.3em] text-gold-light">
              TEACHERS
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold sm:text-3xl">
              {ui.teachersTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-paper/70">
              {ui.teachersLead}
            </p>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {event.teachers.map((teacher) => (
                <article
                  key={teacher.role}
                  className="border border-white/15 bg-white/5 p-6"
                >
                  <p className="text-[11px] tracking-[0.2em] text-gold-light">
                    {teacher.role}
                  </p>
                  <p className="mt-1 text-xs text-paper/45">{teacher.name}</p>
                  <p className="mt-4 text-sm leading-relaxed text-paper/85">
                    {teacher.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PhotoAlbum
          kicker={event.album.kicker}
          title={event.album.title}
          lead={event.album.lead}
          note={event.album.note}
          photos={event.album.photos}
        />

        <section id="stories" className="px-5 pb-20">
          <SectionTitle kicker="AFTER THE NIGHT">
            {ui.storiesTitle}
          </SectionTitle>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            {ui.storiesLead}
          </p>
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
            {event.stories.map((story) => (
              <article
                key={story.title}
                className="flex flex-col rounded-sm border border-ink/10 bg-paper/80 p-6"
              >
                <p className="text-[11px] tracking-[0.2em] text-wine">{story.role}</p>
                <h3 className="mt-3 text-xl leading-snug text-ink">
                  {story.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                  {story.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="program" className="px-5 pb-20">
          <SectionTitle>{ui.programTitle}</SectionTitle>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            {ui.programLead}
          </p>
          <ProgramTimeline items={event.program} />
          <p className="mt-4 text-center">
            <a
              href={event.venueMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-wine underline decoration-wine/40 underline-offset-4"
            >
              {ui.map}
            </a>
          </p>
        </section>

        <section id="souvenir" className="px-5 pb-20">
          <SectionTitle kicker={event.souvenir.kicker}>
            {event.souvenir.title}
          </SectionTitle>
          <p className="mx-auto mb-4 max-w-2xl text-center text-lg font-medium text-ink">
            {event.souvenir.lead}
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            {event.souvenir.body}
          </p>
          <div className="mx-auto mb-10 grid max-w-6xl gap-4 sm:grid-cols-2">
            {event.souvenir.items.map((item) => {
              const opensShop = "shop" in item && item.shop;
              const inner = (
                <>
                  <p className="text-[11px] tracking-[0.2em] text-wine">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {item.body}
                  </p>
                  {opensShop ? (
                    <p className="mt-4 text-sm text-wine">{ui.details}</p>
                  ) : null}
                </>
              );
              const boxClass =
                "border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_30px_rgba(22,20,18,0.05)]";

              return opensShop ? (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => shopDialogRef.current?.showModal()}
                  className={`${boxClass} w-full text-left transition hover:border-wine/40`}
                >
                  {inner}
                </button>
              ) : (
                <article key={item.title} className={boxClass}>
                  {inner}
                </article>
              );
            })}
          </div>
          <AlumnusProfileDialog
            alumnus={event.souvenir.shop}
            dialogRef={shopDialogRef}
            titleId={shopTitleId}
          />
        </section>

        <section id="directory" className="px-5 pb-20">
          <SectionTitle kicker={event.directory.kicker}>
            {event.directory.title}
          </SectionTitle>
          <p className="mx-auto mb-4 max-w-2xl text-center text-lg font-medium text-ink">
            {event.directory.lead}
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            {event.directory.body}
          </p>
          <p className="mb-10 text-center">
            <span className="text-[11px] tracking-[0.25em] text-wine">
              {ui.directoryFee}
            </span>
            <span className="mt-2 block text-3xl text-ink">
              {formatYen(event.directory.fee)}
              <span className="ml-2 text-sm font-normal text-ink/55">
                （{event.directory.feeLabel}）
              </span>
            </span>
          </p>
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
            {event.directory.points.map((point) => (
              <article
                key={point.title}
                className="border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_30px_rgba(22,20,18,0.05)]"
              >
                <p className="text-[11px] tracking-[0.2em] text-wine">
                  {point.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center">
            <a
              href={`mailto:${event.email}?subject=${encodeURIComponent(event.directory.mailSubject)}`}
              className="inline-flex items-center justify-center rounded-full bg-wine px-8 py-3.5 text-sm font-medium text-white transition hover:bg-wine-deep"
            >
              {event.directory.cta}
            </a>
          </p>
        </section>

        <section id="live" className="px-5 pb-20">
          <SectionTitle kicker={event.livestream.kicker}>
            {event.livestream.title}
          </SectionTitle>
          <p className="mx-auto mb-4 max-w-2xl text-center text-lg font-medium text-ink">
            {event.livestream.headline}
          </p>
          <p className="mx-auto mb-4 max-w-2xl text-center text-sm font-medium leading-relaxed text-ink/80">
            {event.livestream.lead}
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            {event.livestream.body}
          </p>
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
            {event.livestream.points.map((point) => (
              <article
                key={point.title}
                className="border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_30px_rgba(22,20,18,0.05)]"
              >
                <p className="text-[11px] tracking-[0.2em] text-wine">
                  {point.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink/60">
            {event.livestream.note}
          </p>
        </section>

        <PaymentMethods />

        <section id="apply" className="px-5 pb-20">
          <div className="mx-auto max-w-3xl rounded-sm bg-wine px-6 py-12 text-center text-paper sm:px-12">
            <p className="text-xs tracking-[0.3em] text-gold-light">
              {ui.applyKicker}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl">
              {event.rsvpNote}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/75">
              {event.rsvpInstruction}
            </p>
          </div>
        </section>

        <section id="faq" className="px-5 pb-20">
          <SectionTitle>{ui.faqTitle}</SectionTitle>
          <div className="mx-auto max-w-3xl space-y-3">
            {event.faqs.map((faq) => (
              <details
                key={faq.q}
                className="border border-[#e8e8e8] bg-white px-5 py-4"
              >
                <summary className="cursor-pointer text-sm font-medium text-ink">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="px-5 pb-24">
          <div className="mx-auto max-w-3xl border border-[#e8e8e8] bg-white px-6 py-10 text-center">
            <h2 className="text-2xl text-ink">{ui.contactTitle}</h2>
            <p className="mt-4 text-lg text-ink">{event.contactOrg}</p>
            <p className="mt-4 space-y-1 text-sm leading-relaxed text-ink/70">
              <a className="block hover:text-wine" href={`tel:${event.tel.replace(/-/g, "")}`}>
                TEL {event.tel}
              </a>
              <span className="block">FAX {event.fax}</span>
              <a className="block hover:text-wine" href={`mailto:${event.email}`}>
                {event.email}
              </a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
