import { Anchor, CSSObject, Group, MantineTheme, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";
import semver from "semver";

const footerLinkStyles = (theme: MantineTheme): CSSObject => ({
  color:
    theme.colorScheme === "light" ? theme.colors.dark[5] : theme.colors.dark[0],
});
const version = semver.parse(APP_VERSION);
const isDirty = version?.build.includes("SNAPSHOT");
const commitHash = version?.build[1];
const VersionElement = isDirty ? Text : Anchor;
const versionLink = commitHash
  ? `https://github.com/The24thDS/rmg-utils/commit/${commitHash}`
  : `https://github.com/The24thDS/rmg-utils/releases/tag/v${APP_VERSION}`;
const versionElementProps = isDirty
  ? {}
  : { href: versionLink, target: "_blank", rel: "noopener noreferrer" };

export default function Footer() {
  return (
    <Group position="apart" mt="auto" p="sm">
      <Group>
        <Text size="sm" color="dimmed">
          &copy; {new Date().getFullYear()} Renegades Modding Group
        </Text>
        &bull;
        <Anchor sx={footerLinkStyles} component={Link} to={ROUTES.PRIVACY.path}>
          {ROUTES.PRIVACY.name}
        </Anchor>
        &bull;
        <Anchor
          sx={footerLinkStyles}
          href="https://steamcommunity.com/workshop/filedetails/?id=2469745470"
          target="_blank"
        >
          RMG's mods collection
        </Anchor>
        &bull;
        <Anchor
          sx={footerLinkStyles}
          href="https://discord.gg/4xfQ78sPpm"
          target="_blank"
        >
          RMG's discord server
        </Anchor>
      </Group>
      <VersionElement size="sm" color="dimmed" {...versionElementProps}>
        Version: {APP_VERSION}
      </VersionElement>
    </Group>
  );
}
