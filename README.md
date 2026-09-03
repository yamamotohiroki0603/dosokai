# 広島城北高等学校 第43回同窓会

広島城北中・高等学校 第43回同窓会の集客LPです。
GitHub: [yamamotohiroki0603/dosokai](https://github.com/yamamotohiroki0603/dosokai)

開催概要は [`lib/event.ts`](lib/event.ts) と案内チラシ [`public/images/flyer.jpg`](public/images/flyer.jpg) にあります。申し込み開始は後日案内です。

## 起動

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

## ページ

- `/` … 集客LP（開催概要・当日の流れ・申し込み案内・問い合わせ）
- `/register` 以降 … 将来のメール認証→Stripe決済のモック（LPからは案内していません）
