"use client";

import { type ComponentProps, useTransition } from "react";

import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { languages } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export const LanguageSelector = ({
  className,
  tabIndex,
}: ComponentProps<typeof DropdownMenuTrigger>) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations();
  const selectedLanguage =
    languages.find((lang) => lang.code === locale) ?? languages[0];

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      (async () => {
        // @ts-ignore
        router.replace({ pathname, params }, { locale: newLocale });
        router.refresh();
      })();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn(
          "rounded-sm transition-colors hover:bg-primary/10",
          isPending && "pointer-events-none opacity-60",
        )}
      >
        <Button
          size="icon"
          className={cn(
            "bg-foreground/0 p-2 hover:bg-foreground/10",
            className,
          )}
          aria-label={t("toggle_language")}
          tabIndex={tabIndex}
        >
          <span
            role="img"
            aria-hidden="true"
            className="text-lg leading-none font-['Segoe_UI_Emoji','Apple_Color_Emoji','Noto_Color_Emoji',sans-serif]"
          >
            {selectedLanguage?.flag ?? "🌐"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLocaleChange(lang.code)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span
                role="img"
                aria-hidden="true"
                className="font-['Segoe_UI_Emoji','Apple_Color_Emoji','Noto_Color_Emoji',sans-serif]"
              >
                {lang.flag}
              </span>
              <span>{lang.name}</span>
            </span>
            {locale === lang.code && <Check className="ml-2 size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
