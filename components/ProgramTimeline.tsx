"use client";

import { useEffect, useId, useRef } from "react";
import { AlumnusProfileDialog } from "@/components/AlumnusProfile";
import { GoldRule } from "@/components/SiteChrome";
import { useI18n } from "@/lib/i18n/I18nProvider";
import Image from "next/image";

export type ProgramItem = {
  time: string;
  title: string;
  detail: string;
  modal?: readonly string[];
  song?: boolean;
  guest?: boolean;
};

export function ProgramTimeline({ items }: { items: readonly ProgramItem[] }) {
  return (
    <ol className="mx-auto max-w-3xl divide-y divide-[#e8e8e8] overflow-hidden border border-[#e8e8e8] bg-white">
      {items.map((item) => (
        <ProgramRow key={`${item.time}-${item.title}`} item={item} />
      ))}
    </ol>
  );
}

function ProgramRow({ item }: { item: ProgramItem }) {
  const hasModal = Boolean(item.modal?.length || item.song || item.guest);

  if (!hasModal) {
    return (
      <li className="flex gap-5 px-5 py-5 sm:gap-8 sm:px-8">
        <span className="w-14 shrink-0 pt-0.5 font-mono text-sm text-wine sm:w-16">
          {item.time}
        </span>
        <div>
          <p className="text-lg font-medium text-ink">{item.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.detail}</p>
        </div>
      </li>
    );
  }

  return (
    <li>
      <ProgramModal item={item} />
    </li>
  );
}

function ProgramModal({ item }: { item: ProgramItem }) {
  const { event, ui } = useI18n();
  const dialogId = `program-${item.time}-${item.title}`;
  const song = item.song ? event.schoolSong : null;
  const guestDialogRef = useRef<HTMLDialogElement>(null);
  const guestTitleId = useId();
  const isGuest = Boolean(item.guest);

  function openDialog() {
    if (isGuest) {
      guestDialogRef.current?.showModal();
      return;
    }
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  function closeDialog() {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    dialog?.close();
  }

  useEffect(() => {
    if (isGuest) return;
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (!dialog) return;

    function onClick(event: MouseEvent) {
      if (event.target === dialog) {
        dialog?.close();
      }
    }

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, [dialogId, isGuest]);

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex w-full gap-5 px-5 py-5 text-left transition hover:bg-paper-dark sm:gap-8 sm:px-8"
      >
        <span className="w-14 shrink-0 pt-0.5 font-mono text-sm text-wine sm:w-16">
          {item.time}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-medium text-ink">{item.title}</p>
          <p className="mt-1 text-sm text-wine">{ui.details}</p>
        </div>
      </button>
      {isGuest ? (
        <AlumnusProfileDialog
          alumnus={event.guest}
          dialogRef={guestDialogRef}
          titleId={guestTitleId}
        />
      ) : (
      <dialog
        id={dialogId}
        className={`m-auto w-[calc(100%-2.5rem)] border border-[#e8e8e8] bg-white p-0 shadow-[0_16px_50px_rgba(22,20,18,0.18)] backdrop:bg-johoku-dark/60 ${
          song
            ? "max-h-[min(90vh,920px)] max-w-3xl overflow-y-auto"
            : "max-w-lg"
        }`}
        aria-labelledby={`${dialogId}-title`}
      >
        <div className="px-6 py-8 sm:px-8">
          <p className="text-xs tracking-[0.3em] text-wine">{item.time}</p>
          <h3
            id={`${dialogId}-title`}
            className="mt-2 text-2xl font-bold text-ink"
          >
            {item.title}
          </h3>
          <div className="my-5 max-w-24">
            <GoldRule />
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-ink/75">
            {item.modal?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {song ? (
            <div className="mt-8 border-t border-[#e8e8e8] pt-6">
              <p className="text-[11px] tracking-[0.25em] text-wine">
                {song.title}
              </p>
              <p className="mt-2 text-sm text-ink/65">
                {ui.lyricist} {song.lyricist}　{ui.composer} {song.composer}
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {song.images.map((image) => (
                  <figure key={image.src} className="overflow-hidden bg-[#f6f6f6]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-auto w-full"
                    />
                  </figure>
                ))}
              </div>
              <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                {song.verses.map((verse, index) => (
                  <li key={verse[0]} className="text-center">
                    <p className="text-xs tracking-[0.25em] text-wine">
                      {index + 1}{ui.verse}
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
            </div>
          ) : null}
          <button
            type="button"
            onClick={closeDialog}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-wine px-8 py-3 text-sm font-medium text-white transition hover:bg-wine-deep"
          >
            {ui.close}
          </button>
        </div>
      </dialog>
      )}
    </>
  );
}
