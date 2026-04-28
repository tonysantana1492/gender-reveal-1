"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function CountdownShare() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations();

  const eventDate = new Date("2026-05-03T14:00:00");

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = eventDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate.getTime]);

  const timeBlocks = [
    {
      value: timeLeft.days,
      label: t("countdown_days"),
      color: "from-blue-500 to-blue-400",
    },
    {
      value: timeLeft.hours,
      label: t("countdown_hours"),
      color: "from-primary to-primary/80",
    },
    {
      value: timeLeft.minutes,
      label: t("countdown_minutes"),
      color: "from-accent to-accent/80",
    },
    {
      value: timeLeft.seconds,
      label: t("countdown_seconds"),
      color: "from-pink-400 to-pink-300",
    },
  ];

  return (
    <section
      id="cuenta-regresiva"
      ref={sectionRef}
      className="py-2 md:py-2 bg-linear-to-b from-pink-light to-blue-light"
      aria-label={t("countdown_section_aria")}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center"
              role="img"
              aria-label={t("countdown_icon_aria")}
            >
              <Calendar className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
          </div>
          <h2 className="font-great-vibes text-5xl md:text-6xl text-gold mb-4">
            {t("countdown_title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("countdown_subtitle")}
          </p>
        </div>

        {/* Countdown */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {timeBlocks.map((block, index) => (
              <Card
                key={block.label}
                className={`bg-card/90 backdrop-blur-sm border-primary/10 shadow-lg transition-all duration-500 hover:scale-105 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`text-4xl md:text-5xl font-bold bg-linear-to-br ${block.color} bg-clip-text text-transparent mb-2`}
                  >
                    {String(block.value).padStart(2, "0")}
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                    {block.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
