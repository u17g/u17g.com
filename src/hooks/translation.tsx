import { createContext, useContext, useCallback } from "hono/jsx";
import { type SupportedLocaleCode, FALLBACK_LOCALE, SUPPORTED_LOCALES } from "../locales";

type LocaleCodeContext = {
  code: SupportedLocaleCode;
};

const LocaleContext = createContext<LocaleCodeContext>({
  code: FALLBACK_LOCALE.code,
});

export const I18nProvider = LocaleContext.Provider;

export function useLocaleCode() {
  const locale = useContext(LocaleContext);
  return locale.code;
}

export function useLocale() {
  const code = useLocaleCode();
  return SUPPORTED_LOCALES.find((locale) => locale.code === code) || FALLBACK_LOCALE;
}

export function useInlineTranslation() {
  const code = useLocaleCode();
  return useCallback(
    <T,>(resources: { [key in SupportedLocaleCode]: T }) =>
      resources[code] || resources[FALLBACK_LOCALE.code],
    [code],
  );
}

export function useCreateLocaledLink() {
  const locale = useLocale();
  return useCallback(
    (path: string, baseUrl?: string) => {
      if (locale.path) {
        return `${baseUrl || ""}/${locale.path}${path}${path.endsWith("/") ? "" : "/"}`;
      }
      return `${baseUrl || ""}${path}${path.endsWith("/") ? "" : "/"}`;
    },
    [locale.path],
  );
}
