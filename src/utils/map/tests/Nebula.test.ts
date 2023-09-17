import { describe, expect, it } from "vitest";

import { Nebula } from "../Nebula";

const line =
  'nebula = { name = "Lurid Aurora Nebula" position = { x = 1 y = -215 } radius = 7 }';

const object = {
  name: "Lurid Aurora Nebula",
  x: -1,
  y: 215,
  radius: 7,
};

describe("Nebula", () => {
  it("saves all the info passed to the constructor", () => {
    const n = new Nebula(line);
    expect(n.name).toEqual("Lurid Aurora Nebula");
    expect(n.x).toEqual(-1);
    expect(n.y).toEqual(215);
    expect(n.radius).toEqual(7);
  });
  it("saves all the info passed to the constructor when passed an object", () => {
    const n = new Nebula(object);
    expect(n.name).toEqual("Lurid Aurora Nebula");
    expect(n.x).toEqual(-1);
    expect(n.y).toEqual(215);
    expect(n.radius).toEqual(7);
    expect(n.toString()).toEqual(line);
  });
  it("throws an error if the line is not parsable", () => {
    expect(
      () => new Nebula(`nebula = { name = "Lurid Aurora Nebula" }`)
    ).toThrow();
  });
  it("toString() returns the correct string", () => {
    const n = new Nebula(line);
    expect(n.toString()).toBe(line);
  });
  it("doesn't destroy other information avaliable in the original line", () => {
    const customLine = `nebula = { name = "Lurid Aurora Nebula" position = { x = 1 y = -215 } radius = 7 effect = { save } }`;
    const n = new Nebula(customLine);
    expect(n.toString()).toBe(customLine);
  });
});
