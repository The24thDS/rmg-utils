import { PrimitiveAtom, atom } from "jotai";

import { Nebula } from "../utils/map/Nebula";

interface Item {
  type: "nebula";
  id: string;
  atom: PrimitiveAtom<Nebula>;
}

type ActionType = "move" | "edit";

export const selectedItemAtom = atom<Item | null>(null);

export const selectedActionAtom = atom<ActionType>("move");
