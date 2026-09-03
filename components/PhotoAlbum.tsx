"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { GoldRule } from "@/components/SiteChrome";
import type { AlbumPhoto } from "@/lib/event";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function PhotoAlbum({
  kicker,
  title,
  lead,
  note,
  photos,
}: {
  kicker: string;
  title: string;
  lead: string;
  note: string;
  photos: readonly AlbumPhoto[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const { ui } = useI18n();

  function openAt(nextIndex: number) {
    setIndex(nextIndex);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function showPrev() {
    setIndex((current) => (current - 1 + photos.length) % photos.length);
  }

  function showNext() {
    setIndex((current) => (current + 1) % photos.length);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onClick(event: MouseEvent) {
      if (event.target === dialog) {
        dialog?.close();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!dialog?.open) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => (current - 1 + photos.length) % photos.length);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + 1) % photos.length);
      }
    }

    dialog.addEventListener("click", onClick);
    dialog.addEventListener("keydown", onKeyDown);
    return () => {
      dialog.removeEventListener("click", onClick);
      dialog.removeEventListener("keydown", onKeyDown);
    };
  }, [photos.length]);

  if (!photo) return null;

  return (
    <section id="album" className="px-5 pb-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-wine">{kicker}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-wide text-ink sm:text-3xl">
          {title}
        </h2>
        <div className="mx-auto my-6 max-w-24">
          <GoldRule />
        </div>
      </div>
      <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
        {lead}
      </p>
      <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((item, photoIndex) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => openAt(photoIndex)}
              aria-haspopup="dialog"
              className="group relative block w-full overflow-hidden bg-[#f6f6f6] text-left"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="aspect-[4/3] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-johoku-dark/55 px-3 py-2 text-xs tracking-[0.2em] text-white">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink/55">
        {note}
      </p>

      <dialog
        ref={dialogRef}
        className="m-auto w-[calc(100%-2.5rem)] max-w-4xl max-h-[min(92vh,960px)] overflow-y-auto border border-[#e8e8e8] bg-white p-0 shadow-[0_16px_50px_rgba(22,20,18,0.18)] backdrop:bg-johoku-dark/60"
        aria-labelledby={titleId}
      >
        <div className="bg-[#111]">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="mx-auto max-h-[70vh] w-auto object-contain"
          />
        </div>
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p id={titleId} className="text-lg font-medium text-ink">
              {photo.caption}
            </p>
            <p className="mt-1 text-xs tracking-wide text-ink/45">
              {index + 1} / {photos.length}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={showPrev}
              className="rounded-full border border-[#e8e8e8] px-5 py-2 text-sm text-ink transition hover:border-wine/40"
            >
              {ui.prev}
            </button>
            <button
              type="button"
              onClick={showNext}
              className="rounded-full border border-[#e8e8e8] px-5 py-2 text-sm text-ink transition hover:border-wine/40"
            >
              {ui.next}
            </button>
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-full bg-wine px-6 py-2 text-sm font-medium text-white transition hover:bg-wine-deep"
            >
              {ui.close}
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
