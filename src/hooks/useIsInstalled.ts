import { createContext, useEffect, useState } from "react";

export const BeforeInstallPromptContext = createContext<
  ReturnType<typeof useBeforeInstallPrompt>
>([null, () => {}]);

/**
 * Returns a boolean indicating whether the web app is installed on the user's device.
 *
 * @returns {boolean} A boolean indicating whether the web app is installed on the user's device.
 */
export const useIsInstalled = () => {
  const isInstalled = window.matchMedia("(display-mode: standalone)").matches;

  return isInstalled;
};

/**
 * A React hook that returns a tuple containing the `BeforeInstallPromptEvent` object and a function to update it.
 * The `BeforeInstallPromptEvent` object is set when the `beforeinstallprompt` event is fired on the window object.
 * The returned function can be used to update the `BeforeInstallPromptEvent` object.
 *
 * @returns A tuple containing the `BeforeInstallPromptEvent` object and a function to update it.
 */
export const useBeforeInstallPrompt = (): [
  null | BeforeInstallPromptEvent,
  React.Dispatch<React.SetStateAction<BeforeInstallPromptEvent | null>>
] => {
  const [prompt, setPrompt] = useState<null | BeforeInstallPromptEvent>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return [prompt, setPrompt];
};
