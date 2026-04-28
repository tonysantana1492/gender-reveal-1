"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  address,
  createGoogleCalendarUrl,
  googleMapsUrl,
  locationName,
  mapEmbedUrl,
  parentsNames,
  phoneNumber,
} from "@/app/constants";
import { useTranslations } from "next-intl";

export function LocationMap() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations();
  const eventDate = t("event_detail_date_value");
  const eventTime = t("event_detail_time_value");
  const googleCalendarUrl = createGoogleCalendarUrl({
    title: t("calendar_title", { parentsNames }),
    details: t("calendar_details", { parentsNames }),
  });

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
      id="ubicacion"
      ref={sectionRef}
      className="py-14 md:py-20 bg-linear-to-b from-pink-light to-blue-light"
      aria-label={t("location_section_aria")}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-great-vibes text-5xl md:text-6xl text-gold mb-4">
            {t("location_title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("location_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 items-stretch">
          {/* Map */}
          <Card
            className={`overflow-hidden p-0 border-primary/10 shadow-xl transition-all duration-700 flex flex-col ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-video w-full grow">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title={t("location_iframe_title")}
              />
            </div>
          </Card>

          {/* Location details */}
        </div>
      </div>
    </section>
  );
}
