"use client";

import { useTranslations } from "next-intl";

export function TeamVote() {
  const t = useTranslations();

  return (
    <section
      id="prediccion"
      aria-label={t("teamVote_section_aria")}
      className="relative py-16 px-4 overflow-hidden bg-linear-to-b from-pink-light to-blue-light"
    >
      {/* Header */}
      <div className="text-center p-10">
        <h2 className="font-great-vibes text-5xl md:text-6xl mb-3 text-gold">
          {t("teamVote_title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("teamVote_subtitle")}
        </p>
      </div>

      {/* Card container */}
      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl">
        {/* Teams grid */}
        <div className="grid grid-cols-2">
          {/* Team Niña */}
          <div
            className="flex flex-col items-center justify-between p-6 text-center"
            style={{
              background: "linear-gradient(160deg, #fce4ec 0%, #f8bbd0 100%)",
            }}
          >
            <div className="text-5xl mb-3">💗</div>
            <h3 className="text-xl font-extrabold text-pink-700 mb-1">
              {t("teamVote_girl_name")}
            </h3>
            <p className="text-xs text-pink-500 mb-4">#TeamNiña</p>
            <ul className="flex flex-col gap-1 text-sm text-pink-700 mb-5">
              <li>🎀 {t("teamVote_girl_trait1")}</li>
              <li>✨ {t("teamVote_girl_trait2")}</li>
              <li>🌸 {t("teamVote_girl_trait3")}</li>
            </ul>
            <button
              type="button"
              className="rounded-full px-5 py-2 text-sm font-bold text-white cursor-default select-none"
              style={{ background: "#e91e8c" }}
            >
              {t("teamVote_girl_cta")}
            </button>
          </div>

          {/* Team Niño */}
          <div
            className="flex flex-col items-center justify-between p-6 text-center border-l border-white/50"
            style={{
              background: "linear-gradient(160deg, #e3f2fd 0%, #bbdefb 100%)",
            }}
          >
            <div className="text-5xl mb-3">💙</div>
            <h3 className="text-xl font-extrabold text-blue-700 mb-1">
              {t("teamVote_boy_name")}
            </h3>
            <p className="text-xs text-blue-500 mb-4">#TeamNiño</p>
            <ul className="flex flex-col gap-1 text-sm text-blue-700 mb-5">
              <li>🚀 {t("teamVote_boy_trait1")}</li>
              <li>⚽ {t("teamVote_boy_trait2")}</li>
              <li>🦋 {t("teamVote_boy_trait3")}</li>
            </ul>
            <button
              type="button"
              className="rounded-full px-5 py-2 text-sm font-bold text-white cursor-default select-none"
              style={{ background: "#1976d2" }}
            >
              {t("teamVote_boy_cta")}
            </button>
          </div>
        </div>

        {/* Footer strip */}
        <div
          className="py-4 text-center"
          style={{
            background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
          }}
        >
          <p className="text-sm text-muted-foreground font-medium">
            🎊 🎈 {t("teamVote_footer")} 🎈 🎊
          </p>
        </div>
      </div>
    </section>
  );
}
