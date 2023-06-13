import { describe, expect, it, test } from "vitest";

import { System } from "../System";

const line = `system = { id = "1" name = "Galactic Center" initializer = galactic_center_initializer position = { y = 1 x = -1 } }`;

describe("System", () => {
  test("test RegExps", () => {
    const baseMatch = System.baseRegExp.exec(line)?.groups;
    expect(baseMatch).toEqual({ id: "1", name: "Galactic Center" });
    const xPosMatch = System.xPosRegExp.exec(line)?.groups;
    expect(xPosMatch).toEqual({ x: "-1" });
    const yPosMatch = System.yPosRegExp.exec(line)?.groups;
    expect(yPosMatch).toEqual({ y: "1" });
    const initMatch = System.initRegExp.exec(line)?.groups;
    expect(initMatch).toEqual({ init: "galactic_center_initializer" });
  });
  it("saves all the info passed to the constructor", () => {
    const s = new System(line);
    expect(s.id).toEqual(1);
    expect(s.name).toEqual("Galactic Center");
    // x and y are flipped in the constructor
    expect(s.x).toEqual(1);
    expect(s.y).toBe(-1);
    expect(s.init).toEqual("galactic_center_initializer");
  });
  it("throws an error if the line is not parsable", () => {
    expect(
      () =>
        new System(
          `system = { id = "1" name = "Galactic Center" initializer = galactic_center_initializer }`
        )
    ).toThrow();
  });
  it("toString() returns the correct string", () => {
    const s = new System(line);
    s.name = "New Name";
    expect(s.toString()).toBe(line.replace("Galactic Center", "New Name"));
  });
  test("it doesn't destroy other information avaliable in the original line", () => {
    const s = new System(
      `system = { id = "425" name = "Itani Nebula Aurek" position = { x = -115 y = 145 } effect = { save_global_event_target_as = itani_nebula_aurek_system } }`
    );
    s.name = "New Name";
    expect(s.toString()).toBe(
      `system = { id = "425" name = "New Name" position = { x = -115 y = 145 } effect = { save_global_event_target_as = itani_nebula_aurek_system } }`
    );
  });
});
