import { ReactNode } from "react";
import {
  createStyles,
  Text,
  Title,
  Button,
  Image,
  rem,
  Center,
} from "@mantine/core";

import { useIsInstalled } from "../../hooks";

import image from "../../assets/images/undraw_progressive_app.svg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [theme.fn.smallerThan("sm")]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

function Banner() {
  const { classes } = useStyles();
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
          <Button className={classes.control}>Install application</Button>
        </div>
      </div>
      <Image src={image} className={classes.image} />
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
