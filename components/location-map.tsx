"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react";
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
      className="py-14 md:py-20 bg-gradient-to-b from-[var(--color-pink-light)] to-[var(--color-blue-light)]"
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

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <Card
            className={`overflow-hidden p-0 border-primary/10 shadow-xl transition-all duration-700 flex flex-col ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-video w-full flex-grow">
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
          <Card
            className={`bg-white/60 backdrop-blur-md border-white/40 shadow-xl hover:shadow-2xl transition-all duration-700 flex flex-col rounded-[2rem] overflow-hidden ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <CardContent className="p-8 md:p-10 space-y-8 grow flex flex-col">
              <div className="space-y-8 grow">
                {/* Title inside card */}
                <div className="text-center mb-6">
                  <h3 className="font-great-vibes text-4xl text-primary">
                    {t("location_card_title")}
                  </h3>
                </div>

                <div className="flex items-start gap-5 group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 border border-white shadow-sm group-hover/item:scale-110 transition-transform duration-500">
                    <MapPin
                      className="w-6 h-6 text-primary/80"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-primary/90 mb-1">
                      {locationName || t("location")}
                    </h3>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/80 hover:text-primary transition-colors leading-relaxed block"
                    >
                      {address}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 border border-white shadow-sm group-hover/item:scale-110 transition-transform duration-500">
                    <Clock
                      className="w-6 h-6 text-primary/80"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-primary/90 mb-1">
                      {t("location_schedule_label")}
                    </h3>
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/80 hover:text-primary transition-colors block"
                    >
                      {eventDate} • {eventTime}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 border border-white shadow-sm group-hover/item:scale-110 transition-transform duration-500">
                    <Phone
                      className="w-6 h-6 text-primary/80"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-primary/90 mb-1">
                      {t("location_contact_label")}
                    </h3>
                    <a
                      href={`tel:${phoneNumber.replace(/\s+/g, "").replace(/[()]/g, "")}`}
                      className="text-muted-foreground/80 hover:text-primary transition-colors block"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation button - Soft & Elegant */}
              <div className="pt-6 border-t border-primary/5">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group/btn"
                >
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/40 rounded-full h-12 text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Navigation className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                    {t("location_open_map")}
                  </Button>
                </a>
                <p className="text-center text-xs text-muted-foreground/60 mt-3 font-light">
                  {t("location_route_hint")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
