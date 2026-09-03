"use client";

import type { ReactNode } from "react";
import { GoldRule } from "@/components/SiteChrome";
import { event as eventShape } from "@/lib/event";
import { paymentLeadText } from "@/lib/i18n/messages";
import { useI18n } from "@/lib/i18n/I18nProvider";

type Payment = (typeof eventShape)["payments"][number];

function MethodGlyph({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine">
      {children}
    </span>
  );
}

function CardGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 10h19" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function KonbiniGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M4 20V9.5L12 4l8 5.5V20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function BankGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M3 10 12 4l9 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CashGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fill="currentColor"
        fontSize="11"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
      >
        ¥
      </text>
    </svg>
  );
}

function PayPayGlyph() {
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11" aria-hidden>
      <rect width="40" height="40" rx="8" fill="#FF241D" />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fill="#FFB800"
        fontSize="18"
        fontWeight="800"
        fontFamily="Arial Black, Arial, sans-serif"
      >
        P
      </text>
    </svg>
  );
}

function BrandMark({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      title={label}
      className={`inline-flex h-8 min-w-12 items-center justify-center overflow-hidden rounded-[4px] px-1.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] ${className ?? ""}`}
    >
      {children}
      <span className="sr-only">{label}</span>
    </span>
  );
}

function CardBrands() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5">
      <BrandMark label="Visa" className="bg-[#1A1F71]">
        <span className="text-[11px] font-bold italic tracking-wide text-white">VISA</span>
      </BrandMark>
      <BrandMark label="Mastercard" className="bg-[#111111] px-2">
        <svg viewBox="0 0 36 22" className="h-5 w-8" aria-hidden>
          <circle cx="13.5" cy="11" r="7.2" fill="#EB001B" />
          <circle cx="22.5" cy="11" r="7.2" fill="#F79E1B" />
          <path
            d="M18 5.6a7.2 7.2 0 0 0 0 10.8 7.2 7.2 0 0 0 0-10.8Z"
            fill="#FF5F00"
          />
        </svg>
      </BrandMark>
      <BrandMark label="JCB" className="bg-white px-1">
        <svg viewBox="0 0 42 22" className="h-5 w-10" aria-hidden>
          <rect x="0" y="0" width="13" height="22" rx="1.5" fill="#1B4EA0" />
          <rect x="14.5" y="0" width="13" height="22" rx="1.5" fill="#D92B2B" />
          <rect x="29" y="0" width="13" height="22" rx="1.5" fill="#1C8A4A" />
          <text x="6.5" y="15.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">
            J
          </text>
          <text x="21" y="15.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">
            C
          </text>
          <text x="35.5" y="15.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">
            B
          </text>
        </svg>
      </BrandMark>
      <BrandMark label="American Express" className="bg-[#006FCF]">
        <span className="text-[9px] font-bold tracking-wide text-white">AMEX</span>
      </BrandMark>
      <BrandMark label="Diners Club" className="bg-[#0079BE]">
        <span className="text-[8px] font-bold tracking-wide text-white">DINERS</span>
      </BrandMark>
      <BrandMark label="Discover" className="bg-[#FF6600]">
        <span className="text-[8px] font-bold tracking-wide text-white">DISCOVER</span>
      </BrandMark>
      <BrandMark label="銀聯 UnionPay" className="bg-white px-1">
        <svg viewBox="0 0 42 22" className="h-5 w-10" aria-hidden>
          <rect width="42" height="22" rx="2" fill="#ED1C24" />
          <rect x="21" width="21" height="22" fill="#00447C" />
          <text x="21" y="14.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Arial, sans-serif">
            銀聯
          </text>
        </svg>
      </BrandMark>
    </div>
  );
}

function KonbiniBrands() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5">
      <BrandMark label="ファミリーマート" className="bg-[#00A040] px-2">
        <span className="text-[8px] font-bold tracking-wide text-white">FamilyMart</span>
      </BrandMark>
      <BrandMark label="ローソン" className="bg-[#0068B7] px-2">
        <span className="text-[8px] font-bold tracking-wide text-white">LAWSON</span>
      </BrandMark>
      <BrandMark label="ミニストップ" className="bg-[#F3E000] px-2">
        <span className="text-[8px] font-bold tracking-wide text-[#1A7A3A]">MINISTOP</span>
      </BrandMark>
      <BrandMark label="セイコーマート" className="bg-[#E60012] px-2">
        <span className="text-[8px] font-bold tracking-wide text-white">Secoma</span>
      </BrandMark>
    </div>
  );
}

function MethodIcon({ kind }: { kind: Payment["kind"] }) {
  switch (kind) {
    case "card":
      return (
        <MethodGlyph>
          <CardGlyph />
        </MethodGlyph>
      );
    case "konbini":
      return (
        <MethodGlyph>
          <KonbiniGlyph />
        </MethodGlyph>
      );
    case "bank":
      return (
        <MethodGlyph>
          <BankGlyph />
        </MethodGlyph>
      );
    case "paypay":
      return (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center">
          <PayPayGlyph />
        </span>
      );
    case "cash":
      return (
        <MethodGlyph>
          <CashGlyph />
        </MethodGlyph>
      );
  }
}

export function PaymentMethods() {
  const { event, locale, ui } = useI18n();
  return (
    <section id="payment" className="px-5 pb-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-wine">PAYMENT</p>
        <h2 className="mt-2 text-2xl font-bold tracking-wide text-ink sm:text-3xl">
          {ui.paymentTitle}
        </h2>
        <div className="mx-auto my-6 max-w-24">
          <GoldRule />
        </div>
      </div>
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
        {paymentLeadText(locale, event.fee, event.feeOnSite)}
      </p>
      <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2">
        {event.payments.map((method) => (
          <li
            key={method.name}
            className={`border border-[#e8e8e8] bg-white px-5 py-5 ${
              method.kind === "card" ? "sm:col-span-2" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <MethodIcon kind={method.kind} />
              <div className="min-w-0 flex-1">
                <p className="text-lg text-ink">{method.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/55">
                  {method.note}
                </p>
                {"detail" in method ? (
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {method.detail}
                  </p>
                ) : null}
                {method.kind === "card" ? <CardBrands /> : null}
                {method.kind === "konbini" ? <KonbiniBrands /> : null}
                {method.kind === "paypay" ? (
                  <div className="mt-4">
                    <BrandMark label="PayPay" className="bg-[#FF241D] px-2.5">
                      <span className="text-[11px] font-bold tracking-wide text-[#FFB800]">
                        PayPay
                      </span>
                    </BrandMark>
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
