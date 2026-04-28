"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { parentsNames } from "@/app/constants";

export function Footer() {
  const t = useTranslations();

  return (
    <footer
      id="footer"
      className="py-12 bg-linear-to-b from-blue-light via-cream to-pink-light"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className="flex items-center justify-center gap-2 mb-4"
          aria-hidden="true"
        >
          <Heart className="w-5 h-5 text-primary fill-primary/30" />
          <Heart className="w-6 h-6 text-primary fill-primary/50" />
          <Heart className="w-5 h-5 text-primary fill-primary/30" />
        </div>

        <p className="font-great-vibes text-4xl text-gold mb-4">
          {t("footer_title")}
        </p>

        <p className="text-muted-foreground mb-6">
          {t("footer_description", { parentsNames })}
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
          <span>{t("footer_made_with")}</span>
          <Heart
            className="w-4 h-4 text-primary fill-primary/50"
            aria-hidden="true"
          />
          <span>{t("footer_for")}</span>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/40">
          {t("footer_copyright", { parentsNames })}
        </p>
      </div>
    </footer>
  );
}
