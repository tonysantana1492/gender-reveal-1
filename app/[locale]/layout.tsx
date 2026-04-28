import type { Metadata } from "next";

import { Nunito } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { parentsNames } from "../constants";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlProvider } from "@/components/next-intl.provider";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

type GenerateMetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ogLocale = locale === "es" ? "es_ES" : "en_US";
  const eventDate = t("event_detail_date_value");

  return {
    title: t("meta_title", { parentsNames }),
    description: t("meta_description", { parentsNames, eventDate }),
    keywords: t("meta_keywords", { parentsNames })
      .split("|")
      .map((item) => item.trim()),
    authors: [{ name: parentsNames }],
    creator: parentsNames,
    publisher: parentsNames,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_URL || "https://baby-shower-liam.vercel.app",
    ),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: "/",
      siteName: t("meta_site_name", { parentsNames }),
      title: t("meta_title", { parentsNames }),
      description: t("meta_og_description", { parentsNames }),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("meta_og_image_alt", { parentsNames }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta_twitter_title", { parentsNames }),
      description: t("meta_twitter_description", {
        parentsNames,
        eventDate,
      }),
      images: ["/og-image.png"],
      creator: "@babyshower",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        {
          url: "/icon-light-32x32.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/icon-light-32x32.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/icon.png",
          type: "image/png",
        },
      ],
      apple: "/icon.png",
    },
  };
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fce4ec" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: t("schema_event_name", { parentsNames }),
              description: t("schema_event_description", {
                parentsNames,
              }),
              startDate: "2026-05-03T14:00:00-05:00",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              organizer: {
                "@type": "Person",
                name: t("schema_organizer_name", { parentsNames }),
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${nunito.variable} ${greatVibes.variable} font-sans antialiased`}
      >
        <NextIntlProvider>{children}</NextIntlProvider>
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}
