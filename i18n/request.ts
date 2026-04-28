import { hasLocale, IntlErrorCode } from "next-intl";
import { defaultLocale, locales } from "./routing";
import { getUserLocaleService } from "@/i18n/locale.service";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  let candidate = await requestLocale;

  if (!candidate) {
    candidate = await getUserLocaleService();
  }

  const locale = hasLocale(locales, candidate) ? candidate : defaultLocale;

  // Load app translations
  const messages = (await import(`../languages/${locale}.json`)).default;

  return {
    locale,
    messages,
    timeZone: "UTC",

    formats: {
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 5,
        },
      },
      list: {
        enumeration: {
          style: "long",
          type: "conjunction",
        },
      },
    },

    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error);
      } else {
        // Other errors indicate a bug in the app and should be reported
        // reportToErrorTracking(error);
        console.error(error);
      }
    },

    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".");

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not yet translated`;
      } else {
        return `Dear developer, please fix this message: ${path}`;
      }
    },
  };
});
