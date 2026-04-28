"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Cake,
  Gift,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { locationName, parentsNames } from "@/app/constants";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const eventDetails = [
    {
      icon: Heart,
      label: t("hero_baby_name_label"),
      value: `${t("hero_baby_name_value")} ♡`,
    },
    {
      icon: CalendarDays,
      label: t("event_detail_date_title"),
      value: t("event_detail_date_value"),
    },
    {
      icon: Clock3,
      label: t("event_detail_time_title"),
      value: t("event_detail_time_value"),
    },
    {
      icon: MapPin,
      label: t("event_detail_location_title"),
      value: locationName,
    },
  ];

  const activities = [
    { icon: Cake, label: t("hero_activity_treats") },
    { icon: Gift, label: t("hero_activity_games") },
    { icon: Sparkles, label: t("hero_activity_moment") },
    { icon: Heart, label: t("hero_activity_love") },
  ];

  const floatingHearts = [
    { left: "22%", delay: "0s",   duration: "3.2s", color: "rgba(244,114,182,0.45)" },
    { left: "34%", delay: "0.7s", duration: "4.1s", color: "rgba(96,165,250,0.45)"  },
    { left: "46%", delay: "1.3s", duration: "3.6s", color: "rgba(244,114,182,0.45)" },
    { left: "52%", delay: "0.4s", duration: "4.8s", color: "rgba(96,165,250,0.45)"  },
    { left: "60%", delay: "1.8s", duration: "3.4s", color: "rgba(244,114,182,0.45)" },
    { left: "68%", delay: "0.9s", duration: "4.3s", color: "rgba(96,165,250,0.45)"  },
    { left: "74%", delay: "2.1s", duration: "3.9s", color: "rgba(244,114,182,0.45)" },
    { left: "80%", delay: "1.5s", duration: "4.6s", color: "rgba(96,165,250,0.45)"  },
  ];

  return (
    <section
      id="bienvenida"
      className="relative isolate overflow-hidden bg-[#f8e8d0]"
      aria-label={t("hero_aria_main")}
    >
      {/* Left watercolor panel */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[26vw] min-w-56 max-w-80 md:block">
        <Image
          src="/assets/a02e60b6-a31c-4ada-8743-a7e67b2970d7 (1).png"
          alt=""
          fill
          className="object-cover object-left"
          sizes="22vw"
        />
      </div>

      {/* Right watercolor panel */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[26vw] min-w-56 max-w-80 md:block">
        <Image
          src="/assets/a02e60b6-a31c-4ada-8743-a7e67b2970d7 (2).png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="22vw"
        />
      </div>

      {/* Floating pink balloon cluster — top left */}
      <div className="pointer-events-none absolute left-0 top-10 z-10 w-20 -translate-x-3 animate-float-slow md:w-32 lg:w-40">
        <Image
          src="/assets/f1cf1ebb-224e-4f59-b1fe-c424126d2f5e (1).png"
          alt=""
          width={302}
          height={595}
          className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(236,72,153,0.18)]"
          sizes="160px"
        />
      </div>

      {/* Floating blue balloon cluster — top right */}
      <div className="pointer-events-none absolute right-0 top-16 z-10 w-20 translate-x-3 animate-float md:w-32 lg:w-40">
        <Image
          src="/assets/aec7d2c9-6d82-4e2d-907d-ea6dc5f02be7 (1).png"
          alt=""
          width={341}
          height={629}
          className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(96,165,250,0.2)]"
          sizes="160px"
        />
      </div>

      {/* Floating hearts — rise from balloon area */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {floatingHearts.map((heart) => (
          <span
            key={heart.left}
            className="animate-float-heart absolute select-none text-base"
            style={{
              left: heart.left,
              bottom: "38%",
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              color: heart.color,
            }}
          >
            ♡
          </span>
        ))}
      </div>

      {/* Main content column */}
      <div className="relative z-20 mx-auto max-w-xl px-6 pb-14 pt-10 text-center md:max-w-2xl md:px-10 md:pb-16 md:pt-12">

        {/* Block 1: Cascading typography */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.48em] text-[#8a6b38] sm:text-[0.65rem]">
            {t("hero_pre_title")}
          </p>
          <h1 className="animate-shimmer font-great-vibes text-7xl leading-none sm:text-8xl lg:text-9xl">
            {t("hero_main_word")}
          </h1>
          <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.48em] text-[#8a6b38] sm:text-[0.65rem]">
            {t("hero_mid_text")}
          </p>
          <p className="animate-shimmer font-great-vibes text-5xl leading-none sm:text-6xl lg:text-7xl">
            {t("hero_pop_word")} ♡
          </p>
        </div>

        {/* Block 2: Hot-air balloon */}
        <div className="relative mx-auto mt-6 w-56 sm:w-64 md:w-72 lg:w-80">
          {/* Pink glow cloud left */}
          <div className="absolute -left-8 top-1/3 h-28 w-28 rounded-full bg-pink-300/35 blur-3xl" />
          {/* Blue glow cloud right */}
          <div className="absolute -right-8 top-1/3 h-28 w-28 rounded-full bg-blue-300/35 blur-3xl" />
          <Image
            src="/assets/3d88515c-ec9e-4479-8e88-c19b7934b2dc.png"
            alt={t("hero_baby_alt", { parentsNames })}
            width={624}
            height={1136}
            className="relative z-10 h-auto w-full animate-float object-contain drop-shadow-[0_24px_50px_rgba(133,92,53,0.3)]"
            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
            priority
          />
        </div>

        {/* Block 3: Ribbon banner */}
        <div
          className={`mt-4 transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative mx-auto h-16 w-full max-w-xs sm:h-20 sm:max-w-sm">
            <Image
              src="/assets/f198f8f8-b3ee-419d-a610-15feb1b904bc (1).png"
              alt=""
              fill
              className="object-contain"
              sizes="384px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-[#8a6b38] sm:text-[0.6rem]">
                {t("hero_join_us")}
              </p>
            </div>
          </div>
          <div className="mt-1 flex items-center justify-center gap-2 sm:gap-3">
            <span className="h-px w-10 bg-[#c08b2d]/50 sm:w-14" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em] text-[#c08b2d] sm:text-xl lg:text-2xl">
              {t("hero_gender_reveal_title")}
            </h2>
            <span className="h-px w-10 bg-[#c08b2d]/50 sm:w-14" />
          </div>
        </div>

        {/* Block 4: Description */}
        <div
          className={`mt-4 transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm leading-relaxed text-[#6b5040] sm:text-base">
            {t.rich("hero_description", {
              he: (chunks) => (
                <span className="font-semibold text-blue-500">{chunks}</span>
              ),
              she: (chunks) => (
                <span className="font-semibold text-pink-500">{chunks}</span>
              ),
            })}
          </p>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-[#c08b2d]/60">
            <span className="h-px w-10 bg-[#c08b2d]/40" />
            <span className="font-great-vibes text-xl text-[#c08b2d]/70">♡</span>
            <span className="h-px w-10 bg-[#c08b2d]/40" />
          </div>
        </div>

        {/* Block 5: Event details — fill-in style */}
        <div
          className={`mt-5 w-full space-y-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {eventDetails.map((detail, i) => (
            <div
              key={detail.label}
              className="flex items-center gap-2 text-left"
              style={{ transitionDelay: `${420 + i * 70}ms` }}
            >
              <detail.icon
                className="h-4 w-4 shrink-0 text-[#c08b2d]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[#8a6b38] sm:text-[0.65rem]">
                {detail.label}:
              </span>
              <span className="min-w-0 flex-1 border-b border-[#c08b2d]/35 pb-0.5 text-xs text-[#6b5040] sm:text-sm">
                {detail.value}
              </span>
            </div>
          ))}
        </div>

        {/* Block 6: Activity icons */}
        <div
          className={`mt-7 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="flex items-start justify-center divide-x divide-[#c08b2d]/25">
            {activities.map((activity) => (
              <div
                key={activity.label}
                className="group flex flex-col items-center gap-1.5 px-3 sm:px-5"
              >
                <activity.icon
                  className="h-6 w-6 text-[#c08b2d] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(192,139,45,0.55)] sm:h-7 sm:w-7"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="max-w-[4.5rem] text-center text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.12em] text-[#8a6b38] sm:max-w-[5.5rem] sm:text-[0.55rem]">
                  {activity.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 7: Dress Code + A Moment to Remember */}
        <div
          className={`mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {/* Dress Code */}
          <div className="relative overflow-hidden rounded-2xl px-5 py-5 text-left">
            <div className="pointer-events-none absolute inset-0">
              <Image
                src="/assets/c327f296-d0b8-44b5-9c6e-42303344a9e0.png"
                alt=""
                fill
                className="object-cover opacity-55"
                sizes="280px"
              />
            </div>
            <div className="relative z-10">
              <p className="font-great-vibes text-2xl text-pink-500">
                {t("hero_dress_code_title")}
              </p>
              <p className="text-[0.6rem] font-medium text-[#8a6b38]">
                {t("hero_dress_code_optional")}
              </p>
              <p className="mt-2 text-[0.7rem] font-semibold text-[#6b5040]">
                {t("hero_dress_code_wear")}
              </p>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-pink-400" />
                  <span className="text-[0.7rem] text-[#6b5040]">
                    <span className="font-bold text-pink-500">PINK</span>{" "}
                    {t("hero_dress_code_pink_suffix")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-blue-400" />
                  <span className="text-[0.7rem] text-[#6b5040]">
                    <span className="font-bold text-blue-500">BLUE</span>{" "}
                    {t("hero_dress_code_blue_suffix")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* A Moment to Remember */}
          <div className="relative rounded-2xl border border-[#c08b2d]/45 bg-[#fffaf3]/85 px-5 py-5 text-center shadow-[0_0_0_1px_rgba(192,139,45,0.12),inset_0_0_14px_rgba(192,139,45,0.07)] backdrop-blur-sm">
            <Heart
              className="mx-auto mb-2 h-5 w-5 text-[#c08b2d]/60"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-great-vibes text-2xl text-[#c08b2d]">
              {t("hero_moment_title")}
            </p>
            <p className="mt-2 text-[0.7rem] leading-relaxed text-[#6b5040]">
              {t("hero_moment_body")}
            </p>
            <p className="mt-2 font-great-vibes text-lg text-pink-500">
              {t("hero_moment_closing")}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[#9d7b4e]/70 transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.38em]">
          {t("hero_scroll")}
        </p>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.8} />
      </div>
    </section>
  );
}
