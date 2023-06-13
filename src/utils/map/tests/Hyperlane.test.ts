import { describe, expect, it } from "vitest";

import { Hyperlane } from "../Hyperlane";

const line = `add_hyperlane = { from = "98" to = "110" }`;

describe("Hyperlane", () => {
  it("saves all the info passed to the constructor", () => {
    const h = new Hyperlane(line);
    expect(h.from).toEqual(98);
    expect(h.to).toEqual(110);
  });
  it("throws an error if the line is not parsable", () => {
    expect(() => new Hyperlane(`add_hyperlane = { from = "98" }`)).toThrow();
  });
  it("toString() returns the correct string", () => {
    const h = new Hyperlane(line);
    expect(h.toString()).toBe(line);
  });
});
