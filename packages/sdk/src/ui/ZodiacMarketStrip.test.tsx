import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ZodiacMarketStrip } from "./ZodiacMarketStrip.js";

describe("ZodiacMarketStrip", () => {
  it("renders no visible market context in SDK UI", () => {
    const markup = renderToStaticMarkup(<ZodiacMarketStrip market={{ status: "unavailable" }} />);

    expect(markup).toBe("");
  });
});
