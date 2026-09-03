"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  isLocale,
  localeStorageKey,
  type Locale,
} from "@/lib/i18n/config";
import { getLocalizedEvent } from "@/lib/i18n/hiroshima-event";
import { uiMessages } from "@/lib/i18n/messages";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  event: ReturnType<typeof getLocalizedEvent>;
  ui: (typeof uiMessages)[Locale];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(localeStorageKey);
    if (isLocale(stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(localeStorageKey, next);
    document.documentElement.dataset.locale = next;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      event: getLocalizedEvent(locale),
      ui: uiMessages[locale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n は I18nProvider の中で使ってください");
  }
  return value;
}
