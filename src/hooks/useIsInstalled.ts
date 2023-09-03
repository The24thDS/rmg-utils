/**
 * Returns a boolean indicating whether the web app is installed on the user's device.
 *
 * @returns {boolean} A boolean indicating whether the web app is installed on the user's device.
 */
export const useIsInstalled = () => {
  const isInstalled = window.matchMedia("(display-mode: standalone)").matches;

  return isInstalled;
};
