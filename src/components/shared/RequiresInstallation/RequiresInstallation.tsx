import { ReactNode } from "react";
import { Text, Title, Center } from "@mantine/core";

import { useIsInstalled } from "../../../hooks";

import image from "../../../assets/images/undraw_progressive_app.svg";
import { InstallApplicationButton } from "../InstallApplicationButton";
import classes from "./RequiresInstallation.module.css";

function Banner() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Hold on...</Title>
        <Text fw={500} fz="lg" mb={5}>
          This feature requires installation!
        </Text>
        <Text fz="sm" c="dimmed">
          To access this feature you have to install the app. Unfortunately, due
          to technical constraints, this functionality isn't available on the
          website version.
        </Text>

        <div className={classes.controls}>
          <InstallApplicationButton className={classes.control}>
            Install application
          </InstallApplicationButton>
        </div>
      </div>
      <img src={image} className={classes.image} />
    </div>
  );
}

export const RequiresInstallation = ({ children }: { children: ReactNode }) => {
  const isInstalled = useIsInstalled();

  if (isInstalled) {
    return <>{children}</>;
  } else {
    return (
      <Center h="60vh">
        <Banner />
      </Center>
    );
  }
};
