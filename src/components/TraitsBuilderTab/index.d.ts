import { FileWithPath } from "@mantine/dropzone";

export interface State {
  name: string;
  bgColor: string;
  bgColorAlt: string;
  iconColor: string;
  files: FileWithPath[];
  iconBlobURL: null | string;
  recolorIcon: boolean;
  iconScale: number;
  iconXOffset: number;
  iconYOffset: number;
}

export type TraitStateActionType =
  | "set_name"
  | "set_bgColor"
  | "set_iconColor"
  | "set_files"
  | "set_iconBlobURL"
  | "set_recolorIcon"
  | "set_iconScale"
  | "set_iconXOffset"
  | "set_iconYOffset";
