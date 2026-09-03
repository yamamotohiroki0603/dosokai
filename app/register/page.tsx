"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FieldLabel, PrimaryButton, TextInput } from "@/components/FormUi";
import { MockBanner, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { sendVerification } from "@/lib/auth";
import { event } from "@/lib/event";
import { updateRegistration } from "@/lib/session";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("氏名を入力してください");
      return;
    }
    setPending(true);
    try {
      await sendVerification(email);
      updateRegistration({
        name: name.trim(),
        email: email.trim(),
        className: className.trim(),
        verified: false,
        paid: false,
        paymentId: undefined,
      });
      router.push("/verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="paper-bg flex min-h-full flex-col">
      <MockBanner />
      <SiteHeader ctaHref="/" ctaLabel="トップへ" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-12">
        <p className="text-xs tracking-[0.25em] text-gold">STEP 01</p>
        <h1 className="mt-2 font-serif text-2xl text-navy">参加申し込み</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          {event.schoolName} {event.reunionName} の参加登録です。本番ではこのメール宛に認証コードが届きます。
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <FieldLabel htmlFor="name">氏名</FieldLabel>
            <TextInput
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 太郎"
              required
            />
          </div>
          <div>
            <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
            <TextInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <FieldLabel htmlFor="className">当時のクラス（任意）</FieldLabel>
            <TextInput
              id="className"
              name="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="3年A組 など"
            />
          </div>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <PrimaryButton type="submit" disabled={pending}>
            {pending ? "送信中…" : "認証コードを受け取る"}
          </PrimaryButton>
        </form>
        <p className="mt-6 text-center text-xs text-ink/50">
          <Link href="/" className="underline decoration-gold/60 underline-offset-4">
            開催概要に戻る
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
