"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { parentsNames } from "@/app/constants";

export function MessageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mensaje"
      ref={sectionRef}
      className="py-10 md:py-20 bg-linear-to-b from-[#f6e9de] via-cream to-pink-light"
      aria-label={t("message_aria")}
    >
      <div
        className={`max-w-4xl mx-auto px-6 text-center transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Quote
          className="w-12 h-12 md:w-16 md:h-16 text-primary/30 mx-auto mb-8 rotate-180"
          aria-hidden="true"
        />

        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 leading-relaxed font-light italic mb-8">
          {t.rich("message_paragraph_1", {
            highlight: (chunks) => (
              <span className="text-primary font-medium">{chunks}</span>
            ),
          })}
        </p>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          {t("message_paragraph_2")}
        </p>

        <div
          className="flex items-center justify-center gap-4"
          aria-hidden="true"
        >
          <div className="h-px w-16 bg-primary/30" />
          <Heart className="w-6 h-6 text-primary fill-primary/20" />
          <div className="h-px w-16 bg-primary/30" />
        </div>

        <p className="mt-8 font-great-vibes text-3xl md:text-4xl text-gold">
          {t("message_signature", { parentsNames })}
        </p>
      </div>
    </section>
  );
}
