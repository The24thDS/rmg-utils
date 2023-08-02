import { useDocumentTitle } from "@mantine/hooks";

import { APP_TITLE } from "../constants";
import { useIsInstalled } from "./useIsInstalled";

/**
 * A custom hook that sets the document title with a given title string.
 * If the app is not installed, the app title is prepended to the given title.
 * @param title - The title string to set as the document title.
 */
export const useCustomDocumentTitle = (title: string) => {
  const isInstalled = useIsInstalled();
  const prefix = isInstalled ? "" : `${APP_TITLE} - `;
  useDocumentTitle(`${prefix}${title}`);
};
