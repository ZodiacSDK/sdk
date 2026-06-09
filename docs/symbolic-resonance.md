# Symbolic Resonance Use Case

Apps can use verified Zodiacs holdings as optional symbolic context for
identity surfaces, readings, profile cards, share cards, and aura-style visual
experiences. The SDK provides registry verification, public ownership reads,
identity context, and official display assets. The app owns the actual
resonance model, bar fill, tooltip copy, and share-card rendering.

This pattern is not a wallet flow, horoscope engine, market feature, or access
control system. It should never imply that a user needs more assets to become
better, rarer, more spiritual, or eligible for a feature.

## How It Works

1. Read public holdings with `@zodiacs/sdk/base` or `@zodiacs/sdk/solana`.
2. Compute neutral identity context with `@zodiacs/sdk/identity`.
3. Load official display assets with `@zodiacs/sdk/assets`.
4. Map held signs to app-side resonance facets.
5. Render bars, hover text, or share cards in the app.

```ts
import { getZodiacIdentityContext } from "@zodiacs/sdk/identity";
import { getZodiacIconAsset } from "@zodiacs/sdk/assets";
import type { ZodiacIdentityOwnershipInput, ZodiacSign } from "@zodiacs/sdk/core";

const resonanceFacets: Record<ZodiacSign, readonly string[]> = {
  aries: ["Courage", "Momentum", "Initiative"],
  taurus: ["Stability", "Devotion", "Abundance"],
  gemini: ["Curiosity", "Wit", "Adaptability"],
  cancer: ["Care", "Intuition", "Protection"],
  leo: ["Radiance", "Confidence", "Generosity"],
  virgo: ["Clarity", "Craft", "Discernment"],
  libra: ["Harmony", "Grace", "Diplomacy"],
  scorpio: ["Depth", "Magnetism", "Power"],
  sagittarius: ["Freedom", "Vision", "Fortune"],
  capricorn: ["Discipline", "Mastery", "Legacy"],
  aquarius: ["Originality", "Insight", "Liberation"],
  pisces: ["Imagination", "Compassion", "Mysticism"]
};

export function getResonancePreview(ownership: ZodiacIdentityOwnershipInput) {
  const identity = getZodiacIdentityContext(ownership);

  return identity.heldSigns.map((sign) => ({
    sign,
    icon: getZodiacIconAsset(sign),
    facets: resonanceFacets[sign]
  }));
}
```

In a Base app, the ownership object can come directly from a public read:

```ts
import { getBaseZodiacsOwnership } from "@zodiacs/sdk/base";

const ownership = await getBaseZodiacsOwnership(publicClient, publicAddress, {
  onPartialFailure: "warn"
});
const resonancePreview = getResonancePreview(ownership);
```

## Facet Meanings

Use short second-person copy for hover text, tooltips, and share cards. The
copy should answer: "What does this say about me?" Keep each meaning to one
plain sentence.

| Sign        | Facet        | User-facing meaning                                         |
| ----------- | ------------ | ----------------------------------------------------------- |
| Aries       | Courage      | You move forward even when the path is not fully clear.     |
| Aries       | Momentum     | You bring energy that gets things started.                  |
| Aries       | Initiative   | You are often the first to act when something matters.      |
| Taurus      | Stability    | You create calm by staying steady and grounded.             |
| Taurus      | Devotion     | You show care through consistency and presence.             |
| Taurus      | Abundance    | You notice what is enough and help it grow.                 |
| Gemini      | Curiosity    | You stay endlessly interested in how things work.           |
| Gemini      | Wit          | You catch patterns quickly and keep the mood alive.         |
| Gemini      | Adaptability | You adjust easily when the situation changes.               |
| Cancer      | Care         | You notice what people need before they say it.             |
| Cancer      | Intuition    | You often sense the emotional truth underneath the surface. |
| Cancer      | Protection   | You know how to guard what feels tender or important.       |
| Leo         | Radiance     | You bring warmth and visibility into the room.              |
| Leo         | Confidence   | You are learning to take up space without shrinking.        |
| Leo         | Generosity   | You share attention, warmth, and creative energy freely.    |
| Virgo       | Clarity      | You help make confusing things feel clean and workable.     |
| Virgo       | Craft        | You improve things through patience, detail, and care.      |
| Virgo       | Discernment  | You can tell what matters and what can be released.         |
| Libra       | Harmony      | You sense when something needs balance.                     |
| Libra       | Grace        | You move through tension with tact and beauty.              |
| Libra       | Diplomacy    | You help different sides find a way to meet.                |
| Scorpio     | Depth        | You are drawn to what is hidden, intense, and real.         |
| Scorpio     | Magnetism    | You carry a quiet pull that people can feel.                |
| Scorpio     | Power        | You can transform pressure into inner strength.             |
| Sagittarius | Freedom      | You need space to explore, learn, and expand.               |
| Sagittarius | Vision       | You look for meaning beyond the immediate moment.           |
| Sagittarius | Fortune      | You notice openings, timing, and possibility.               |
| Capricorn   | Discipline   | You keep going when the work asks for patience.             |
| Capricorn   | Mastery      | You build confidence through effort and repetition.         |
| Capricorn   | Legacy       | You care about what lasts beyond the moment.                |
| Aquarius    | Originality  | You see things from an angle others might miss.             |
| Aquarius    | Insight      | You recognize patterns before they become obvious.          |
| Aquarius    | Liberation   | You help break stale patterns and imagine new ones.         |
| Pisces      | Imagination  | You move easily through dreams, symbols, and possibility.   |
| Pisces      | Compassion   | You feel deeply and respond with care.                      |
| Pisces      | Mysticism    | You are comfortable with mystery and unseen meaning.        |

## Share Copy

Use language that frames holdings as optional symbolic emphasis:

- "Taurus appears in your connected wallet, adding a subtle layer of stability,
  devotion, and abundance."
- "Your verified zodiac holdings add optional symbolic context to this reading."
- "Scorpio adds depth, magnetism, and power as symbolic emphasis."

## Product Guardrails

- Use "resonance," "emphasis," "symbolic context," and "appears in your
  connected wallet."
- Do not imply that more holdings make readings better, rarer, premium, or more
  accurate.
- Do not use ownership to control paid digital features or readings.
- Do not pressure users to add assets.
- Keep "Fortune" as timing and possibility, not money, guaranteed luck, or
  prediction.
- Keep aura bars, hover text, and share-card rendering in the app layer.
