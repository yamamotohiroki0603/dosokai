# 同窓会 集客ページ

高校の同窓会向けの案内・申し込みサイト（モック）です。
GitHub: [yamamotohiroki0603/dosokai](https://github.com/yamamotohiroki0603/dosokai)

開催概要（高校名・日時・会場・会費）は仮の文言です。決まり次第 [`lib/event.ts`](lib/event.ts) を更新します。

## 起動

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

## 申し込みフロー（モック）

1. `/` … 集客ページ
2. `/register` … 氏名とメールを入力
3. `/verify` … 認証コードを入力（テスト用コード **123456**）
4. `/checkout` … Stripe 風の会費支払い（実課金なし）
5. `/complete` … 完了

メールは送信しません。カード情報もサーバーへ送りません。

## 本番で差し替える箇所

| 役割 | いま | 本番の想定 |
| --- | --- | --- |
| メール認証 | [`lib/auth.ts`](lib/auth.ts) | Resend + Magic Link / NextAuth など |
| 決済 | [`lib/payments.ts`](lib/payments.ts) | Stripe Checkout または Payment Intent |
| 開催概要 | [`lib/event.ts`](lib/event.ts) | 確定した文言・写真 |

`.env.local` に API キーを置く想定です。env ファイルは git に含めません。

## デプロイ

Next.js のため GitHub Pages ではなく、Vercel 等のサーバー付きホスティングを想定しています。このリポジトリの初回ではデプロイ設定は入れていません。
