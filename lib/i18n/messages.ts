import { formatYen } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";

type UiMessages = {
  apply: string;
  menuOpen: string;
  menuClose: string;
  menu: string;
  close: string;
  details: string;
  photoDetails: string;
  prev: string;
  next: string;
  map: string;
  lyricist: string;
  composer: string;
  verse: string;
  realName: string;
  address: string;
  hometown: string;
  birth: string;
  hours: string;
  career: string;
  website: string;
  language: string;
  navAria: string;
  paymentTitle: string;
  paymentLead: (pre: string, onSite: string) => string;
  heroJoin: string;
  heroTeachers: string;
  heroLive: string;
  guideHeld: (date: string, venue: string) => string;
  guideBody: string;
  overviewDate: string;
  overviewVenue: string;
  overviewFee: string;
  overviewFeeValue: (amount: string) => string;
  overviewFeeSub: (amount: string) => string;
  overviewLive: string;
  overviewLiveValue: string;
  overviewLiveSub: string;
  storiesTitle: string;
  storiesLead: string;
  directoryFee: string;
  teachersTitle: string;
  teachersLead: string;
  programTitle: string;
  programLead: string;
  applyKicker: string;
  faqTitle: string;
  contactTitle: string;
  flyerAlt: (school: string, reunion: string) => string;
};

export const uiMessages: Record<Locale, UiMessages> = {
  ja: {
    apply: "申し込み",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
    menu: "メニュー",
    close: "閉じる",
    details: "詳細を見る",
    photoDetails: "写真を押して詳細を見る",
    prev: "前へ",
    next: "次へ",
    map: "会場の地図を開く",
    lyricist: "作詞",
    composer: "作曲",
    verse: "番",
    realName: "本名",
    address: "所在地",
    hometown: "出身地",
    birth: "生年月日",
    hours: "営業時間",
    career: "経歴",
    website: "ホームページを開く",
    language: "言語",
    navAria: "ページ内ナビゲーション",
    paymentTitle: "お支払い方法",
    paymentLead: (pre, onSite) =>
      `事前申し込みは ${pre}。当日現金のみ ${onSite}（税込）になります。決済は Stripe を使います。`,
    heroJoin: "参加すると、何が残るか",
    heroTeachers: "先生からのメッセージ",
    heroLive: "行けなくても安心",
    guideHeld: (date, venue) => `${date}、${venue}にて開催します。`,
    guideBody: "同級生だけでなく、当日は当時の先生方も席に着きます。",
    overviewDate: "開催日時",
    overviewVenue: "会場",
    overviewFee: "会費",
    overviewFeeValue: (amount) => `事前 ${amount}`,
    overviewFeeSub: (amount) => `当日現金は ${amount}（税込）`,
    overviewLive: "ライブ中継",
    overviewLiveValue: "閲覧無料",
    overviewLiveSub: "非公開YouTube Live。おひねりしてね。",
    storiesTitle: "参加したら、何が残るのか",
    storiesLead:
      "杯を傾けるだけではありません。過去の参加者からは、仕事の話、紹介、次の一歩につながった声が届いています。",
    directoryFee: "協賛金",
    teachersTitle: "先生と会える夜です",
    teachersLead:
      "同級生だけではありません。当日は当時の先生方も席に着きます。会えること自体が、この会のいちばんの理由です。",
    programTitle: "当日の流れ",
    programLead: "進行はダミーの案です。確定次第、このページを更新します。",
    applyKicker: "お申し込み",
    faqTitle: "よくある質問",
    contactTitle: "お問い合わせ",
    flyerAlt: (school, reunion) => `${school} ${reunion} 案内チラシ`,
  },
  hiroshima: {
    apply: "申し込み",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
    menu: "メニュー",
    close: "閉じる",
    details: "詳細を見てみんさい。",
    photoDetails: "写真を押したら見てみんさい",
    prev: "前へ",
    next: "次へ",
    map: "会場の地図を開く",
    lyricist: "作詞",
    composer: "作曲",
    verse: "番",
    realName: "本名",
    address: "所在地",
    hometown: "出身地",
    birth: "生年月日",
    hours: "営業時間",
    career: "経歴",
    website: "ホームページを開く",
    language: "言葉",
    navAria: "ページの案内",
    paymentTitle: "支払いの仕方",
    paymentLead: (pre, onSite) =>
      `事前の申し込みなら ${pre}じゃ。当日に現金で払うんは ${onSite}（税込）になるけぇ。`,
    heroJoin: "出たら、何が残るんか",
    heroTeachers: "先生と会える夜じゃ",
    heroLive: "行けんでも安心じゃ！",
    guideHeld: (date, venue) => `${date}、${venue}でやるけぇ。`,
    guideBody:
      "同級生ばっかりじゃのう。当日は、昔の先生方にも席に着いてもろうて、一緒に飲んでもらうけぇ。久しぶりに、顔見せに来いや。",
    overviewDate: "開催日時",
    overviewVenue: "会場",
    overviewFee: "会費",
    overviewFeeValue: (amount) => `事前申し込み ${amount}`,
    overviewFeeSub: (amount) => `当日 ${amount}（税込）`,
    overviewLive: "ライブ中継",
    overviewLiveValue: "見るんはタダじゃ。",
    overviewLiveSub: "YouTube Liveで流すけぇ。",
    storiesTitle: "出たら、何が残るんか",
    storiesLead:
      "杯を傾けるだけじゃないんよ。前に出た人からは、仕事の話がつながった。先輩を紹介してもろうた。次の一歩が決まった。いう声が届いとるけぇ。",
    directoryFee: "協賛金",
    teachersTitle: "先生と会える夜じゃ",
    teachersLead:
      "卒業して何十年経ったんかのう。先生にまた会うて、昔の話でもしながら、一杯やる夜じゃ。",
    programTitle: "当日の流れ",
    programLead:
      "当日の進行は、いまんところ仮じゃけぇ。決まったら、ここの内容を直すけぇの。",
    applyKicker: "申し込み",
    faqTitle: "よう聞かれること",
    contactTitle: "問い合わせ",
    flyerAlt: (school, reunion) => `${school} ${reunion} 案内のチラシ`,
  },
};

export function paymentLeadText(locale: Locale, fee: number, feeOnSite: number) {
  return uiMessages[locale].paymentLead(formatYen(fee), formatYen(feeOnSite));
}
