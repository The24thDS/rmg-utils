import { testData } from "../example/galaxy_test";
import { Hyperlane } from "./map/Hyperlane";
import { Nebula } from "./map/Nebula";
import { System } from "./map/System";

export const parseData = () => {
  const systems = new Map<number, System>();
  const hyperlanes: Array<Hyperlane> = [];
  const nebulas = new Map<string, Nebula>();
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
    // check if the line is a nebula using the baseRegExp
    else if (Nebula.baseRegExp.exec(line)) {
      const nebula = new Nebula(line);
      nebulas.set(nebula.id, nebula);
    }
  });
  return { systems, hyperlanes, nebulas };
};
