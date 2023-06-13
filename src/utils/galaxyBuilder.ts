import { testData } from "../example/galaxy_test";
import { System } from "./map/System";

export const parseData = () => {
  const systems = new Map<number, System>();
  const lines = testData.split("\n");
  lines.forEach((line) => {
    // check if the line is a system using the baseRegExp
    if (System.baseRegExp.exec(line)?.groups) {
      const system = new System(line);
      systems.set(system.id, system);
    }
  });
  return systems;
};
