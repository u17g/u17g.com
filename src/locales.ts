export type SupportedLocaleCode = "en" | "ja";

export type Locale = {
  code: SupportedLocaleCode;
  path: string;
  label: string;
};

export const SUPPORTED_LOCALES: Locale[] = [
  { code: "en", path: "", label: "English" },
  { code: "ja", path: "ja-jp", label: "日本語" },
];

export const FALLBACK_LOCALE = SUPPORTED_LOCALES[0];
