"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { FlowGuard } from "@/components/FlowGuard";
import { FieldLabel, PrimaryButton, TextInput } from "@/components/FormUi";
import { MockBanner, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { event } from "@/lib/event";
import { formatYen } from "@/lib/format";
import { confirmPayment, createCheckout } from "@/lib/payments";
import { getRegistration, updateRegistration } from "@/lib/session";

function formatCardNumber(value: string) {
  return value
    .replace(/[^\d]/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/[^\d]/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function CheckoutForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const registration = getRegistration();
    setName(registration.name);
    setEmail(registration.email);
    setQuantity(registration.quantity || 1);
    setHolderName(registration.name);
  }, []);

  const amount = useMemo(() => event.fee * quantity, [quantity]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const session = await createCheckout(amount, quantity);
      const result = await confirmPayment(session.id, {
        number,
        expiry,
        cvc,
        holderName,
      });
      updateRegistration({
        quantity,
        paid: true,
        paymentId: result.paymentId,
      });
      router.push("/complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "決済に失敗しました");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <p className="text-xs tracking-[0.25em] text-gold">STEP 03</p>
      <h1 className="mt-2 font-serif text-2xl text-navy">会費のお支払い</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">
        Stripe 風の決済画面です。カード情報はどこにも送信されず、課金も発生しません。
      </p>

      <div className="mt-6 rounded-2xl border border-navy/10 bg-white/80 p-4">
        <p className="text-xs tracking-wide text-ink/50">お申し込み内容</p>
        <p className="mt-1 text-sm text-navy">
          {name}（{email}）
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <label htmlFor="quantity" className="text-sm text-navy">
            人数
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} 名
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex items-baseline justify-between border-t border-navy/10 pt-3">
          <span className="text-sm text-ink/60">
            {formatYen(event.fee)} × {quantity}
          </span>
          <span className="font-serif text-xl text-navy">{formatYen(amount)}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <FieldLabel htmlFor="holderName">カード名義</FieldLabel>
          <TextInput
            id="holderName"
            name="holderName"
            autoComplete="cc-name"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            placeholder="TARO YAMADA"
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="number">カード番号</FieldLabel>
          <TextInput
            id="number"
            name="number"
            inputMode="numeric"
            autoComplete="cc-number"
            value={number}
            onChange={(e) => setNumber(formatCardNumber(e.target.value))}
            placeholder="4242 4242 4242 4242"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor="expiry">有効期限</FieldLabel>
            <TextInput
              id="expiry"
              name="expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <FieldLabel htmlFor="cvc">CVC</FieldLabel>
            <TextInput
              id="cvc"
              name="cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
              placeholder="123"
              required
            />
          </div>
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <PrimaryButton type="submit" disabled={pending}>
          {pending ? "処理中…" : `${formatYen(amount)} を支払う（モック）`}
        </PrimaryButton>
        <p className="text-center text-[11px] leading-relaxed text-ink/45">
          本番では Stripe Checkout に差し替えます。テスト番号 4242 でも、任意の16桁でも進みます。
        </p>
      </form>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <div className="paper-bg flex min-h-full flex-col">
      <MockBanner />
      <SiteHeader ctaHref="/" ctaLabel="トップへ" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-12">
        <FlowGuard require="verified">
          <CheckoutForm />
        </FlowGuard>
      </main>
      <SiteFooter />
    </div>
  );
}
