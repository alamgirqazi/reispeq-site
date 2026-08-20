export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; englishLabel: string; dir: "ltr" | "rtl"; htmlLang: string; ogLocale: string }
> = {
  en: { label: "English", englishLabel: "English", dir: "ltr", htmlLang: "en", ogLocale: "en_US" },
  ar: { label: "العربية", englishLabel: "Arabic", dir: "rtl", htmlLang: "ar", ogLocale: "ar_AE" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix a route with its locale segment. `path` must start with "/" or be "". */
export function localePath(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
