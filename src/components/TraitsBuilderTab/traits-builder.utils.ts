import { modifyHSLValue } from "../../utils/general";

import { State, TraitStateActionType } from "./index.d";

export const traitsBuilderReducer = (
  state: State,
  action: { type: TraitStateActionType; value: any }
): State => {
  switch (action.type) {
    case "set_name":
      return {
        ...state,
        name: action.value,
      };
    case "set_bgColor":
      return {
        ...state,
        bgColor: action.value,
        bgColorAlt: modifyHSLValue(action.value, { l: -15 }),
      };
    case "set_iconColor":
      return {
        ...state,
        iconColor: action.value,
      };
    case "set_files":
      return {
        ...state,
        files: action.value,
      };
    case "set_iconBlobURL":
      return {
        ...state,
        iconBlobURL: action.value,
      };
    case "set_recolorIcon":
      return {
        ...state,
        recolorIcon: action.value,
      };
    case "set_iconScale":
      return {
        ...state,
        iconScale: action.value,
      };
    case "set_iconXOffset":
      return {
        ...state,
        iconXOffset: action.value,
      };
    case "set_iconYOffset":
      return {
        ...state,
        iconYOffset: action.value,
      };
    default:
      return state;
  }
};

export const traitsBackgroundColors = [
  "hsl(350, 94%, 42%)",
  "hsl(177, 91%, 43%)",
  "hsl(166, 100%, 41%)",
  "hsl(43, 94%, 57%)",
  "hsl(94, 56%, 41%)",
  "hsl(221, 66%, 51%)",
  "hsl(180, 38%, 50%)",
  "hsl(127, 44%, 44%)",
  "hsl(199, 69%, 50%)",
  "hsl(268, 87%, 57%)",
  "hsl(34, 69%, 50%)",
  "hsl(0, 3%, 61%)",
];
