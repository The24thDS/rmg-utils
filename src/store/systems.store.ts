import { atom } from "jotai";
import { splitAtom } from "jotai/utils";

import { System } from "../utils/map/System";

export const systemsAtom = atom<System[]>([]);
export const systemsAtomsAtom = splitAtom(systemsAtom, (system) => system.id);
export const systemsLayerActiveAtom = atom(true);