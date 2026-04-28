"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { parentsNames } from "@/app/constants";
import { useTranslations } from "next-intl";

export function CoupleGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations();

  const galleryImages = [
    {
      src: "/love_story_expecting.jpeg",
      alt: t("gallery_image_1_alt", { parentsNames }),
      caption: t("gallery_image_1_caption"),
    },
    {
      src: "/love_story_shoes.png",
      alt: t("gallery_image_2_alt", { parentsNames }),
      caption: t("gallery_image_2_caption"),
    },
    {
      src: "/love_story_ultrasound.jpeg",
      alt: t("gallery_image_3_alt", { parentsNames }),
      caption: t("gallery_image_3_caption"),
    },
    {
      src: "/love_story_nursery.jpeg",
      alt: t("gallery_image_4_alt", { parentsNames }),
      caption: t("gallery_image_4_caption"),
    },
    {
      src: "/love_belly.jpeg",
      alt: t("gallery_image_5_alt", { parentsNames }),
      caption: t("gallery_image_5_caption"),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="py-16 md:py-20 bg-linear-to-b from-blue-light to-pink-light"
      aria-label={t("gallery_section_aria")}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-great-vibes text-5xl md:text-6xl text-gold mb-4">
            {t("gallery_title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("gallery_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.caption}
              className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${index === 1 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`relative aspect-3/4 h-full`}>
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{image.caption}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
