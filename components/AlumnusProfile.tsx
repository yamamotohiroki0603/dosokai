"use client";

import Image from "next/image";
import { useEffect, useId, useRef, type RefObject } from "react";
import { GoldRule } from "@/components/SiteChrome";
import type { FeaturedAlumnus } from "@/lib/event";
import { useI18n } from "@/lib/i18n/I18nProvider";

function isLandscape(alumnus: FeaturedAlumnus) {
  return "orientation" in alumnus && alumnus.orientation === "landscape";
}

function profileSubtitle(
  alumnus: FeaturedAlumnus,
  realNameLabel: string,
) {
  return [
    "reading" in alumnus ? alumnus.reading : null,
    "realName" in alumnus ? `${realNameLabel} ${alumnus.realName}` : null,
  ]
    .filter(Boolean)
    .join("／");
}

export function AlumnusProfileDialog({
  alumnus,
  dialogRef,
  titleId,
}: {
  alumnus: FeaturedAlumnus;
  dialogRef: RefObject<HTMLDialogElement | null>;
  titleId: string;
}) {
  const { ui } = useI18n();
  const landscape = isLandscape(alumnus);
  const subtitle = profileSubtitle(alumnus, ui.realName);

  function closeDialog() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onClick(event: MouseEvent) {
      if (event.target === dialog) {
        dialog?.close();
      }
    }

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, [dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[calc(100%-2.5rem)] max-w-3xl max-h-[min(90vh,920px)] overflow-y-auto border border-[#e8e8e8] bg-white p-0 shadow-[0_16px_50px_rgba(22,20,18,0.18)] backdrop:bg-johoku-dark/60"
      aria-labelledby={titleId}
    >
      <div
        className={
          landscape
            ? "grid"
            : "grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]"
        }
      >
        <figure className="bg-[#f6f6f6]">
          <Image
            src={alumnus.image}
            alt={alumnus.name}
            width={alumnus.imageWidth}
            height={alumnus.imageHeight}
            className={
              landscape
                ? "h-auto w-full object-cover object-center"
                : "h-full w-full object-cover object-top"
            }
          />
        </figure>
        <div className="flex flex-col px-6 py-8 sm:px-8">
          {"alumniLabel" in alumnus ? (
            <p className="text-[11px] tracking-[0.25em] text-wine">
              {alumnus.alumniLabel}
            </p>
          ) : (
            <p className="text-[11px] tracking-[0.25em] text-wine">
              {alumnus.role}
            </p>
          )}
          <h3 id={titleId} className="mt-2 text-2xl font-bold text-ink">
            {alumnus.name}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-xs tracking-wide text-ink/45">{subtitle}</p>
          ) : null}
          <div className="my-5 max-w-24">
            <GoldRule />
          </div>
          <dl className="space-y-2 text-sm">
            {"address" in alumnus && alumnus.address ? (
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 tracking-[0.15em] text-wine">
                  {ui.address}
                </dt>
                <dd className="text-ink">{alumnus.address}</dd>
              </div>
            ) : "hometown" in alumnus && alumnus.hometown ? (
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 tracking-[0.15em] text-wine">
                  {ui.hometown}
                </dt>
                <dd className="text-ink">{alumnus.hometown}</dd>
              </div>
            ) : null}
            {"birth" in alumnus && alumnus.birth ? (
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 tracking-[0.15em] text-wine">
                  {ui.birth}
                </dt>
                <dd className="text-ink">{alumnus.birth}</dd>
              </div>
            ) : null}
            {"hours" in alumnus && alumnus.hours ? (
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 tracking-[0.15em] text-wine">
                  {ui.hours}
                </dt>
                <dd className="text-ink">{alumnus.hours}</dd>
              </div>
            ) : null}
            {"tel" in alumnus && alumnus.tel ? (
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 tracking-[0.15em] text-wine">
                  TEL
                </dt>
                <dd className="text-ink">{alumnus.tel}</dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-ink/70">
            {alumnus.body}
          </p>
          <p className="mt-6 text-[11px] tracking-[0.25em] text-wine">
            {"careerLabel" in alumnus ? alumnus.careerLabel : ui.career}
          </p>
          <ul className="mt-3 space-y-2 border-t border-[#e8e8e8] pt-3 text-sm leading-relaxed text-ink/75">
            {alumnus.career.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-wine" />
                {item}
              </li>
            ))}
          </ul>
          {"website" in alumnus && alumnus.website ? (
            <p className="mt-6">
              <a
                href={alumnus.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-wine underline decoration-wine/40 underline-offset-4"
              >
                {ui.website}
              </a>
            </p>
          ) : null}
          <button
            type="button"
            onClick={closeDialog}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-wine px-8 py-3 text-sm font-medium text-white transition hover:bg-wine-deep"
          >
            {ui.close}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function AlumnusProfile({ alumnus }: { alumnus: FeaturedAlumnus }) {
  const { ui } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const landscape = isLandscape(alumnus);
  const subtitle = profileSubtitle(alumnus, ui.realName);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        className={`mx-auto grid w-full max-w-6xl overflow-hidden border border-[#e8e8e8] bg-white text-left transition hover:border-wine/40 ${
          landscape
            ? "lg:grid-cols-1"
            : "lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]"
        }`}
      >
        <figure className="relative bg-[#f6f6f6]">
          <Image
            src={alumnus.image}
            alt={alumnus.name}
            width={alumnus.imageWidth}
            height={alumnus.imageHeight}
            className={
              landscape
                ? "h-auto w-full object-cover object-center"
                : "h-full w-full object-cover object-top"
            }
          />
          <span className="absolute inset-x-0 bottom-0 bg-johoku-dark/55 px-4 py-3 text-center text-xs tracking-[0.2em] text-white">
            {ui.photoDetails}
          </span>
        </figure>
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
          {"alumniLabel" in alumnus ? (
            <p className="text-[11px] tracking-[0.25em] text-wine">
              {alumnus.alumniLabel}
            </p>
          ) : (
            <p className="text-[11px] tracking-[0.25em] text-wine">{alumnus.role}</p>
          )}
          <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            {alumnus.name}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-xs tracking-wide text-ink/45">{subtitle}</p>
          ) : null}
          {"alumniLabel" in alumnus ? (
            <p className="mt-2 text-sm text-ink/70">{alumnus.role}</p>
          ) : null}
          <p className="mt-6 text-sm leading-relaxed text-ink/70">{alumnus.teaser}</p>
          <p className="mt-6 text-sm text-wine">{ui.details}</p>
        </div>
      </button>

      <AlumnusProfileDialog
        alumnus={alumnus}
        dialogRef={dialogRef}
        titleId={titleId}
      />
    </>
  );
}
