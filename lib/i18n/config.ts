export const locales = ["ja", "hiroshima"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export const localeStorageKey = "dosokai-locale";

/** 方言アイコンは `icon.src` だけ差し替えればよい。 */
export const localeOptions: {
  id: Locale;
  label: string;
  icon: {
    src: string;
    alt: string;
  };
}[] = [
  {
    id: "ja",
    label: "東京弁",
    icon: {
      src: "/images/i18n/tokyo-mark.png",
      alt: "東京都シンボルマーク",
    },
  },
  {
    id: "hiroshima",
    label: "広島弁",
    icon: {
      src: "/images/i18n/hiroshima-mark.png",
      alt: "広島県章",
    },
  },
];

export function isLocale(value: string | null): value is Locale {
  return value === "ja" || value === "hiroshima";
}
