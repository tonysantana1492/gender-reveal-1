import { defaultLocale, locales } from "@/i18n/routing";
import { hasLocale, Locale } from "next-intl";
import { cookies } from "next/headers";

export async function getUserLocaleService(): Promise<Locale> {
  const candidate = (await cookies()).get("language")?.value;
  return hasLocale(locales, candidate) ? candidate : defaultLocale;
}

export async function setUserLocaleService(locale: string) {
  (await cookies()).set("language", locale);
}
