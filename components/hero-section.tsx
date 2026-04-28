"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { parentsNames } from "@/app/constants";

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

  const floatingHearts = [
    {
      left: "22%",
      delay: "0s",
      duration: "3.2s",
      color: "rgba(244,114,182,0.95)",
    },
    {
      left: "34%",
      delay: "0.7s",
      duration: "4.1s",
      color: "rgba(96,165,250,0.95)",
    },
    {
      left: "46%",
      delay: "1.3s",
      duration: "3.6s",
      color: "rgba(244,114,182,0.95)",
    },
    {
      left: "52%",
      delay: "0.4s",
      duration: "4.8s",
      color: "rgba(96,165,250,0.95)",
    },
    {
      left: "60%",
      delay: "1.8s",
      duration: "3.4s",
      color: "rgba(244,114,182,0.95)",
    },
    {
      left: "68%",
      delay: "0.9s",
      duration: "4.3s",
      color: "rgba(96,165,250,0.95)",
    },
    {
      left: "74%",
      delay: "2.1s",
      duration: "3.9s",
      color: "rgba(244,114,182,0.95)",
    },
    {
      left: "80%",
      delay: "1.5s",
      duration: "4.6s",
      color: "rgba(96,165,250,0.95)",
    },
  ];

  return (
    <section
      id="bienvenida"
      className="relative bg-[#f8e8d0] max-w-screen h-screen flex items-start justify-center"
      aria-label={t("hero_aria_main")}
    >
      {/* Left watercolor panel */}
      <div className="absolute inset-y-0 left-0 sm:w-1/3 w-full">
        <Image src="/assets/left.png" alt="" fill className="object-fill" />
      </div>

      {/* Right watercolor panel */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-1/3">
        <Image
          src="/assets/right.png"
          alt=""
          fill
          className="object-top-right"
        />
      </div>

      {/* Floating pink balloon cluster — top left */}
      <div className="absolute left-32 hidden md:block top-10 z-10 w-36 -translate-x-3 animate-float-slow">
        <Image
          src="/assets/f1cf1ebb-224e-4f59-b1fe-c424126d2f5e (1).png"
          alt=""
          width={202}
          height={495}
          className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(236,72,153,0.18)]"
          sizes="100px"
        />
      </div>

      {/* Floating pink balloon cluster — bottom left */}
      <div className="absolute left-24 hidden md:block bottom-10 z-10 w-24 -translate-x-3 animate-float-slow">
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
      <div className="absolute right-24 hidden md:block top-16 z-10 w-18 translate-x-3 animate-float">
        <Image
          src="/assets/aec7d2c9-6d82-4e2d-907d-ea6dc5f02be7 (1).png"
          alt=""
          width={341}
          height={629}
          className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(96,165,250,0.2)]"
          sizes="160px"
        />
      </div>

      {/* Floating blue balloon cluster — bottom right */}
      <div className="absolute right-24 hidden md:block bottom-12 z-10 w-32 translate-x-3 animate-float">
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
      <div className=" absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
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
      <div className="relative z-20 mx-auto max-w-xl px-6 pb-14 pt-10 text-center">
        {/* Block 1: Cascading typography */}
        <div className={`transition-all duration-700 relative`}>
          <p className="absolute right-12 top-3 text-[0.6rem] font-semibold uppercase tracking-[0.48em] text-[#8a6b38]">
            {t("hero_pre_title")}
          </p>
          <h1 className="animate-shimmer font-great-vibes pt-4 text-7xl leading-none">
            {t("hero_main_word")}
          </h1>
          <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.48em] text-[#8a6b38] sm:text-[0.65rem]">
            {t("hero_mid_text")}
          </p>
          <p className="animate-shimmer pt-2 font-great-vibes text-5xl leading-none sm:text-6xl lg:text-7xl">
            {t("hero_pop_word")} ♡
          </p>
        </div>

        {/* Block 2: Hot-air balloon */}
        <div className="relative mx-auto">
          {/* Pink glow cloud left */}
          <div className="absolute -left-8 top-1/3 h-28 w-28 rounded-full bg-pink-300/35 blur-3xl" />
          {/* Blue glow cloud right */}
          <div className="absolute -right-8 top-1/3 h-28 w-28 rounded-full bg-blue-300/35 blur-3xl" />
          <Image
            src="/assets/ballon.png"
            alt={t("hero_baby_alt", { parentsNames })}
            width={624}
            height={1136}
            className="relative mx-auto w-64 z-10 h-auto object-contain drop-shadow-[0_24px_50px_rgba(133,92,53,0.3)]"
            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
            priority
          />

          <div className="absolute bottom-8 right-0 mx-auto z-32 h-16 w-full sm:block hidden">
            <Image
              src="/assets/f198f8f8-b3ee-419d-a610-15feb1b904bc (1).png"
              alt=""
              fill
              className="object-contain mx-auto drop-shadow-[0_20px_30px_rgba(236,72,153,0.18)]"
              sizes="384px"
            />
          </div>
          <div className="hidden items-center justify-center gap-2 sm:gap-3 sm:block">
            <span className="h-px w-10 bg-[#c08b2d]/50" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em] text-gold">
              {t("hero_gender_reveal_title")}
            </h2>
            <span className="h-px w-10 bg-[#c08b2d]/50" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-18 block sm:hidden w-3/4">
        <Image
          src="/assets/card-2.png"
          alt=""
          width={341}
          height={629}
          className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(96,165,250,0.2)]"
          sizes="160px"
        />
      </div>

      <p className="absolute bottom-32 text-center text-2xl font-great-vibes text-gold block sm:hidden">
        {t("a_moment_to_remember")}
      </p>

      {/* Scroll indicator */}
      <div
        className={`sm:hidden pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[#9d7b4e]/70 transition-opacity duration-500 ${
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
