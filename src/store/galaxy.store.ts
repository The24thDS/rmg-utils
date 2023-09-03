import { PrimitiveAtom, atom } from "jotai";

import { Nebula } from "../utils/map/Nebula";

interface Item {
  type: "nebula";
  id: string;
  atom: PrimitiveAtom<Nebula>;
}

export const selectedItemAtom = atom<Item | null>(null);
