import { PrimitiveAtom, atom } from "jotai";

import { Nebula } from "../utils/map/Nebula";
import { System } from "../utils/map/System";

export interface Item {
  type: "nebula" | "system";
  id: string | number;
  atom: PrimitiveAtom<Nebula> | PrimitiveAtom<System>;
}

type ActionType = "move" | "edit";

export const selectedItemAtom = atom<Item | null>(null);

export const selectedActionAtom = atom<ActionType>("move");

export function isSystemItem(item: Item | null): item is Item & { id: number; atom: PrimitiveAtom<System> } {
  return !!item && typeof item.id === 'number' && item.type === 'system';
}