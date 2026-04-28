"use client";

import { useRef, useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  PartyPopper,
  ExternalLink,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import {
  address,
  createGoogleCalendarUrl,
  locationName,
  googleMapsUrl,
  parentsNames,
} from "@/app/constants";
import { useTranslations } from "next-intl";

export function EventDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations();
  const googleCalendarUrl = createGoogleCalendarUrl({
    title: t("calendar_title", { parentsNames }),
    details: t("calendar_details", { parentsNames }),
  });

  const eventDetails = [
    {
      icon: Calendar,
      title: t("event_detail_date_title", { parentsNames }),
      value: t("event_detail_date_value"),
      subtitle: t("event_detail_date_subtitle"),
      action: googleCalendarUrl,
      actionLabel: t("event_detail_date_action"),
    },
    {
      icon: Clock,
      title: t("event_detail_time_title"),
      value: t("event_detail_time_value"),
      subtitle: t("event_detail_time_subtitle"),
    },
    {
      icon: MapPin,
      title: t("event_detail_location_title"),
      value: locationName ?? t("location"),
      subtitle: address,
      action: googleMapsUrl,
      actionLabel: t("event_detail_location_action"),
    },
    {
      icon: PartyPopper,
      title: t("event_detail_dress_title"),
      value: t("event_detail_dress_value"),
      subtitle: t("event_detail_dress_subtitle"),
    },
  ];

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
      id="detalles"
      ref={sectionRef}
      className="py-16 md:py-20 bg-linear-to-b from-blue-light to-pink-light"
      aria-label={t("event_section_aria")}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-great-vibes text-5xl md:text-6xl text-gold mb-4">
            {t("event_title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("event_subtitle")}</p>
        </div>

        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          aria-label={t("event_list_aria")}
        >
          {eventDetails.map((detail, index) => (
            <li
              key={detail.title}
              className={`list-none group bg-white/60 backdrop-blur-md border-white/40 hover:border-white/60 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 rounded-4xl overflow-hidden ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-8 pb-6 px-4 text-center h-full flex flex-col items-center justify-start">
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white shadow-sm shrink-0"
                  role="img"
                  aria-label={t("event_icon_aria", {
                    title: detail.title.toLowerCase(),
                  })}
                >
                  <detail.icon
                    className="w-6 h-6 text-primary/80"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                <div className="grow flex flex-col items-center justify-start w-full">
                  <h3 className="font-great-vibes text-3xl text-primary mb-2 shrink-0 h-8">
                    {detail.title}
                  </h3>

                  <div className="flex flex-col items-center justify-center grow">
                    {detail.action ? (
                      <a
                        href={detail.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group-hover:text-primary transition-colors flex flex-col items-center justify-center gap-0.5"
                        title={detail.actionLabel}
                      >
                        <p className="text-base font-medium text-foreground/90 border-b border-transparent group-hover:border-primary/30 transition-all leading-tight">
                          {detail.value}
                        </p>
                        <span className="text-[10px] text-primary/60 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {t("event_view_now")}{" "}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </a>
                    ) : (
                      <p className="text-base h-8 font-medium text-foreground/90 leading-tight">
                        {detail.value}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground/80 mt-0.5 font-light">
                      {detail.subtitle}
                    </p>
                  </div>
                </div>
              </CardContent>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
