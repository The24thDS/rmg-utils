import { testData } from "../example/galaxy_test";
import { Hyperlane } from "./map/Hyperlane";
import { System } from "./map/System";

export const parseData = () => {
  const systems = new Map<number, System>();
  const hyperlanes: Array<Hyperlane> = [];
  const lines = testData.split("\n");
  lines.forEach((line) => {
    // check if the line is a system using the baseRegExp
    if (System.baseRegExp.exec(line)?.groups) {
      const system = new System(line);
      systems.set(system.id, system);
    }
    // check if the line is a hyperlane using the baseRegExp
    else if (Hyperlane.baseRegExp.exec(line)) {
      const hyperlane = new Hyperlane(line);
      hyperlanes.push(hyperlane);
    }
  });
  return { systems, hyperlanes };
};
