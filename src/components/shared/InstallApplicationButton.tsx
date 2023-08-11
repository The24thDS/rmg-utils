import { useContext } from "react";
import { Alert, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

import { BeforeInstallPromptContext } from "../../hooks/useIsInstalled";
import { isAnalyticsEnabled } from "../../utils/general";

export const InstallApplicationButton = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => {
  const [event, setValue] = useContext(BeforeInstallPromptContext);

  if (!event) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
        Your browser doesn't support installing PWA apps or you already have
        this app installed. Check if you have the app installed or try using a
        Chromium based browser.
      </Alert>
    );
  }

  const handleClick = async () => {
    if (isAnalyticsEnabled) {
      window.umami.track("install-app-button");
    }
    event.prompt();
    const { outcome } = await event.userChoice;
    setValue(null);
    if (isAnalyticsEnabled) {
      const event =
        outcome === "accepted" ? "installed-app" : "dismissed-install-app";
      window.umami.track(event);
    }
  };

  return (
    <Button className={className} onClick={handleClick}>
      {children}
    </Button>
  );
};
