"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { languages } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPending, startTransition] = useTransition();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
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

  useEffect(() => {
    // Attempt playback on mount
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.1;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay blocked by browser policy:", error);
            setIsPlaying(false);
          });
      }
    }

    // Fallback: Try to play on first user interaction
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.log("Interaction play failed", e));
      }
      // Remove listeners once we've attempted interaction play
      ["click", "touchstart", "keydown"].forEach((event) =>
        document.removeEventListener(event, handleInteraction),
      );
    };

    // Add listeners for multiple interaction types
    ["click", "touchstart", "keydown"].forEach((event) =>
      document.addEventListener(event, handleInteraction),
    );

    return () => {
      ["click", "touchstart", "keydown"].forEach((event) =>
        document.removeEventListener(event, handleInteraction),
      );
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/background-music.mp4"
        loop
        autoPlay // Try to autoplay via attribute as well
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="fixed bottom-20 right-6 z-40 h-12 w-12 rounded-full border border-primary/20 bg-card/90 text-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            title={t("toggle_language")}
            aria-label={t("toggle_language")}
            disabled={isPending}
          >
            <span
              role="img"
              aria-hidden="true"
              className="text-lg leading-none font-['Segoe_UI_Emoji','Apple_Color_Emoji','Noto_Color_Emoji',sans-serif]"
            >
              {selectedLanguage?.flag || "🌐"}
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
                  {lang.flag || "🌐"}
                </span>
                <span>{lang.name}</span>
              </span>
              {locale === lang.code && <Check className="ml-2 size-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Floating music control */}
      <Button
        onClick={togglePlay}
        size="icon"
        variant="secondary"
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm border border-primary/20 ${
          isPlaying ? "animate-pulse" : ""
        }`}
        title={isPlaying ? t("pause_music") : t("play_music")}
        aria-label={isPlaying ? t("pause_music") : t("play_music")}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </Button>
    </>
  );
}
