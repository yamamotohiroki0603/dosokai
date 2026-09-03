import Image from "next/image";
import type { ReactNode } from "react";
import { event } from "@/lib/event";
import { formatYen } from "@/lib/format";
import { GoldRule, SiteFooter, SiteHeader } from "@/components/SiteChrome";

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

export default function Home() {
  return (
    <div className="paper-bg flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate min-h-[70vh] overflow-hidden">
          <Image
            src="/images/gallery/life-01.jpg"
            alt="広島城北中・高等学校のキャンパス"
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
                参加すると、何が残るか
              </a>
              <a
                href="#teachers"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3.5 text-sm text-white transition hover:bg-white/10"
              >
                先生からのメッセージ
              </a>
            </div>
          </div>
        </section>

        <section className="bg-paper-dark px-5 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
            <div className="mx-auto w-full max-w-sm overflow-hidden border border-[#e8e8e8] bg-white shadow-sm">
              <Image
                src="/images/flyer.jpg"
                alt={`${event.schoolName} ${event.reunionName} 案内チラシ`}
                width={1054}
                height={1492}
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-wine">GUIDE</p>
              <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                {event.schoolName}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {event.dateLabel}、{event.venueName}にて開催します。
                同級生だけでなく、当日は当時の先生方も席に着きます。
              </p>
            </div>
          </div>
        </section>


        <section id="overview" className="px-5 py-20">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "開催日時", value: event.dateLabel, sub: event.timeLabel },
              {
                label: "会場",
                value: event.venueName,
                sub: event.venueAddress,
              },
              {
                label: "会費",
                value: `事前 ${formatYen(event.fee)}`,
                sub: `当日現金は ${formatYen(event.feeOnSite)}（税込）`,
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
          </div>
        </section>

        <section id="payment" className="px-5 pb-20">
          <SectionTitle kicker="PAYMENT">お支払い方法</SectionTitle>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            事前申し込みは {formatYen(event.fee)}。当日現金のみ{" "}
            {formatYen(event.feeOnSite)}（税込）になります。
          </p>
          <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {event.payments.map((method) => (
              <li
                key={method.name}
                className="border border-[#e8e8e8] bg-white px-5 py-4"
              >
                <p className="text-lg text-ink">{method.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/55">
                  {method.note}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="stories" className="px-5 pb-20">
          <SectionTitle kicker="AFTER THE NIGHT">
            参加したら、何が残るのか
          </SectionTitle>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            杯を傾けるだけではありません。過去の参加者からは、仕事の話、紹介、次の一歩につながった声が届いています。
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

        <section id="teachers" className="px-5 pb-20">
          <div className="mx-auto max-w-6xl bg-johoku-dark px-5 py-14 text-white sm:px-10">
            <p className="text-center text-xs tracking-[0.3em] text-gold-light">
              TEACHERS
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold sm:text-3xl">
              先生と会える夜です
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-paper/70">
              同級生だけではありません。当日は当時の先生方も席に着きます。会えること自体が、この会のいちばんの理由です。
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

        <section id="gallery" className="px-5 pb-20">
          <SectionTitle kicker="CAMPUS">あの学び舎、あの空気</SectionTitle>
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {event.gallery.map((photo) => (
              <figure key={photo.src} className="overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="h-full w-full object-cover"
                />
                <figcaption className="mt-2 text-xs tracking-[0.2em] text-ink/50">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="px-5 pb-20">
          <SectionTitle>当日の流れ</SectionTitle>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            進行はダミーの案です。確定次第、このページを更新します。
          </p>
          <ol className="mx-auto max-w-3xl divide-y divide-[#e8e8e8] overflow-hidden border border-[#e8e8e8] bg-white">
            {event.program.map((item) => (
              <li
                key={`${item.time}-${item.title}`}
                className="flex gap-5 px-5 py-5 sm:gap-8 sm:px-8"
              >
                <span className="w-14 shrink-0 pt-0.5 font-mono text-sm text-wine sm:w-16">
                  {item.time}
                </span>
                <div>
                  <p className="text-lg font-medium text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-center">
            <a
              href={event.venueMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-wine underline decoration-wine/40 underline-offset-4"
            >
              会場の地図を開く
            </a>
          </p>
        </section>

        <section id="song" className="bg-paper-dark px-5 py-20">
          <SectionTitle kicker="SCHOOL SONG">校歌</SectionTitle>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
            作詞 {event.schoolSong.lyricist}　作曲 {event.schoolSong.composer}
            <br />
            総会のあと、全員で斉唱します。
          </p>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <figure className="overflow-hidden bg-white">
              <Image
                src="/images/gallery/koka-lyrics.png"
                alt="広島城北高等学校 校歌の歌詞"
                width={703}
                height={357}
                className="h-auto w-full"
              />
            </figure>
            <figure className="overflow-hidden bg-white">
              <Image
                src="/images/gallery/koka-callig.png"
                alt="広島城北高等学校 校歌の直筆"
                width={950}
                height={460}
                className="h-auto w-full"
              />
            </figure>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-3">
            {event.schoolSong.verses.map((verse, index) => (
              <li key={verse[0]} className="text-center">
                <p className="text-xs tracking-[0.25em] text-wine">
                  {index + 1}番
                </p>
                <p className="mt-3 font-serif text-[15px] leading-[2.1] text-ink">
                  {verse.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="apply" className="px-5 pb-20">
          <div className="mx-auto max-w-3xl rounded-sm bg-wine px-6 py-12 text-center text-paper sm:px-12">
            <p className="text-xs tracking-[0.3em] text-gold-light">
              お申し込み
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl">
              {event.rsvpNote}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/75">
              {event.rsvpInstruction}
            </p>
          </div>
        </section>

        <section className="px-5 pb-20">
          <SectionTitle>よくある質問</SectionTitle>
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
            <h2 className="text-2xl text-ink">お問い合わせ</h2>
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
