import random from "random";

type LocatorColor = "blue" | "yellow" | "orange" | "green";

const locatorColors: LocatorColor[] = ["blue", "yellow", "green", "orange"];

export const makeLocator = (index: string, time: string, color: LocatorColor) =>
  `event = { time = ${time} node = "light_locator_${index}" particle = "ship_light_${color}_regular_effect" keep_particle = yes trigger_once = yes }`;

export const makeLocators = (amount: number, stateTime: number) => {
  const locators = Array(amount)
    .fill(null)
    .map((_, i) => {
      const index = (i + 1)
        .toString()
        .padStart(amount.toString().length + 1, "0");
      const time = random.float(0, stateTime).toFixed(2);
      const color = locatorColors[random.int(0, locatorColors.length - 1)];
      return makeLocator(index, time, color);
    });
  return locators;
};
