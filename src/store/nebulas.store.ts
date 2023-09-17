import { atom } from "jotai";
import { splitAtom } from "jotai/utils";

import { Nebula } from "../utils/map/Nebula";

export const nebulasAtom = atom<Nebula[]>([]);
export const nebulasAtomsAtom = splitAtom(nebulasAtom, (nebula) => nebula.id);
export const nebulasLayerActiveAtom = atom(true);
