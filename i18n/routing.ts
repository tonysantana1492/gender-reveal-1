import { Locale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export const locales = languages.map((lang) => lang.code);

export const defaultLocale: Locale = languages[0]?.code || "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: "never",
  localeCookie: {
    name: "language",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});
