"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SIGN_GLYPHS, ZODIAC_SIGNS } from "../../../lib/zodiac";
import type { ZodiacSign } from "../../../lib/zodiac";
import type { DailySkyPayload } from "../../../lib/horoscope/schema";
import { AppHeader, FooterNote } from "../../../components/AppHeader";
import { EventsCalendar } from "../../../components/sky/EventsCalendar";
import { HoroscopeCard } from "../../../components/sky/HoroscopeCard";
import { ShareButton } from "../../../components/ShareButton";
import { SignIcon } from "../../../components/SignIcon";

const MOOD_BADGE: Record<string, string> = {
  radiant: "☀️ Radiant",
  balanced: "🌤 Balanced",
  turbulent: "🌪 Turbulent"
};

export default function SkyPage() {
  const [sign, setSign] = useState<ZodiacSign>("aries");
  const { data, isLoading } = useQuery({
    queryKey: ["horoscope"],
    queryFn: async () => {
      const response = await fetch("/api/horoscope");
      if (!response.ok) {
        throw new Error("horoscope unavailable");
      }
      return (await response.json()) as DailySkyPayload;
    },
    staleTime: 5 * 60 * 1000
  });

  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(new Date());

  return (
    <>
      <AppHeader title="Today's Sky" subtitle={today} />

      <div className="sign-rail">
        {ZODIAC_SIGNS.map((s) => (
          <button key={s} data-active={s === sign} onClick={() => setSign(s)}>
            <SignIcon sign={s} size={46} />
            {s}
          </button>
        ))}
      </div>

      {isLoading ? <p className="muted">Reading the sky…</p> : null}

      {data ? (
        <>
          <HoroscopeCard sign={sign} reading={data.sky.signs[sign]} />

          <section className="card">
            <div className="row spread">
              <h2 style={{ margin: 0 }}>Cosmic weather</h2>
              <span className="delta-pill flat">
                {MOOD_BADGE[data.sky.global.marketMood] ?? data.sky.global.marketMood}
              </span>
            </div>
            <p className="muted" style={{ marginBottom: 0 }}>
              {data.sky.global.blurb}
            </p>
          </section>

          <EventsCalendar events={data.events} />

          <div className="row" style={{ justifyContent: "center" }}>
            <ShareButton
              label="Share today's reading"
              text={`${SIGN_GLYPHS[sign]} ${sign} — ${data.sky.signs[sign].vibe}. Today's sky on Zodiacs Astro Exchange.`}
              embedPath={`/share/horoscope/${sign}`}
            />
          </div>
        </>
      ) : null}

      <FooterNote>For entertainment only — never financial advice.</FooterNote>
    </>
  );
}
