import { getZodiacIdentityContext } from "@zodiacs/sdk/identity";
import { createMockOwnership } from "@zodiacs/sdk/testing";

const ownership = createMockOwnership({
  heldSigns: ["libra", "leo"]
});

const auraContext = getZodiacIdentityContext(ownership, {
  sunSign: "leo"
});

const simastryAuraPayload = {
  app: "Simastry",
  surface: "shareable Aura page",
  source: "Zodiacs SDK read-only ownership context",
  chart: {
    sunSign: "Leo"
  },
  verifiedOwnership: {
    heldSigns: auraContext.heldSigns,
    elementComposition: auraContext.elementComposition,
    currentSeasonHeld: auraContext.currentSeasonHeld
  },
  aiAstrologistContext: {
    includeInConversation: true,
    promptHint: "Use verified held signs as carried-sign context beside the birth chart."
  },
  posture: "Official registry. Public reads. No custody. No signing. No transactions."
};

console.log(JSON.stringify(simastryAuraPayload, null, 2));
