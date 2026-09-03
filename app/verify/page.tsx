"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FlowGuard } from "@/components/FlowGuard";
import { FieldLabel, PrimaryButton, TextInput } from "@/components/FormUi";
import { MockBanner, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MOCK_VERIFICATION_CODE, verifyCode } from "@/lib/auth";
import { getRegistration, updateRegistration } from "@/lib/session";

function VerifyForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setEmail(getRegistration().email);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      await verifyCode(email, code);
      updateRegistration({ verified: true });
      router.push("/checkout");
    } catch (err) {
      setError(err instanceof Error ? err.message : "認証に失敗しました");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <p className="text-xs tracking-[0.25em] text-gold">STEP 02</p>
      <h1 className="mt-2 font-serif text-2xl text-navy">メール認証</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">
        <span className="font-medium text-navy">{email}</span>{" "}
        宛にコードを送った想定です。本番のメール送信はまだつながっていません。
      </p>
      <div className="mt-6 rounded-2xl border border-gold/40 bg-white/80 px-4 py-3 text-sm text-navy">
        テスト用コード{" "}
        <span className="font-mono text-base tracking-[0.35em] text-gold">
          {MOCK_VERIFICATION_CODE}
        </span>
      </div>
      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <FieldLabel htmlFor="code">認証コード</FieldLabel>
          <TextInput
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6桁のコード"
            required
          />
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <PrimaryButton type="submit" disabled={pending}>
          {pending ? "確認中…" : "認証して会費支払いへ"}
        </PrimaryButton>
      </form>
      <p className="mt-6 text-center text-xs text-ink/50">
        メールを間違えた場合は{" "}
        <Link
          href="/register"
          className="underline decoration-gold/60 underline-offset-4"
        >
          登録に戻る
        </Link>
      </p>
    </>
  );
}

export default function VerifyPage() {
  return (
    <div className="paper-bg flex min-h-full flex-col">
      <MockBanner />
      <SiteHeader ctaHref="/" ctaLabel="トップへ" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-12">
        <FlowGuard require="email">
          <VerifyForm />
        </FlowGuard>
      </main>
      <SiteFooter />
    </div>
  );
}
