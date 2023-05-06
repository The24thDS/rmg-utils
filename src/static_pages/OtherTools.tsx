import { Anchor, Container, List, Text, Title } from "@mantine/core";

export default function OtherTools() {
  return (
    <Container>
      <Title order={3} my="sm">
        RMG Tools
      </Title>
      <Text size="xl">
        Our team members have developed a range of small tools and utilities
        that simplify the process of modding. These tools have been created with
        the needs of modders in mind, and are designed to streamline the process
        and improve your overall modding experience.
      </Text>
      <List size="xl" my="sm">
        <List.Item>
          <Anchor
            target="_blank"
            href="https://marketplace.visualstudio.com/items?itemName=The24thDS.stellaris-yaml-syntax"
          >
            24's Stellaris YAML Syntax
          </Anchor>
          , a VS Code extension giving you syntax highlighting and color themes
          for Stellaris localisation files;
        </List.Item>
        <List.Item>
          <Anchor
            target="_blank"
            download=""
            href="https://cdn.discordapp.com/attachments/442565538045100062/1010634192645787688/component_slots.code-snippets"
          >
            component slots code snippets
          </Anchor>{" "}
          for VS Code which make writing section templates faster (
          <Anchor
            target="_blank"
            href="https://cdn.discordapp.com/attachments/442565538045100062/1010634193144918178/component_slots.mp4"
          >
            demo video
          </Anchor>
          ).
        </List.Item>
      </List>
      <Title order={3} my="sm">
        External tools
      </Title>
      <Text size="xl">
        When it comes to external tools, it's important to note that we don't
        have control over their production or maintenance. Therefore, we can't
        guarantee their quality or reliability. That being said, we have curated
        a selection of external tools that we personally love and believe can be
        beneficial to your modding journey.
      </Text>
      <List size="xl" my="sm">
        <List.Item>
          <Anchor
            target="_blank"
            href="https://ttftcuts.github.io/stellaris_modifier_icons/"
          >
            Stellaris Modifier Icons
          </Anchor>{" "}
          by TTFTCUTS, a little web tool to generate the full suite of modifier
          icons for resources, district cap icons and job add modifiers;
        </List.Item>
        <List.Item>
          <Anchor
            target="_blank"
            download=""
            href="https://cdn.discordapp.com/attachments/442565538045100062/1008450900647477388/localisation.code-snippets"
          >
            localisation colors code snippets
          </Anchor>{" "}
          for VS Code, by MichaelMakesGames, makes it easier to add color codes
          in locs (
          <Anchor
            target="_blank"
            href="https://cdn.discordapp.com/attachments/442565538045100062/1008450518051455086/color-snippet.webm"
          >
            demo video
          </Anchor>
          );
        </List.Item>
        <List.Item>
          <Anchor
            target="_blank"
            href="https://github.com/OldEnt/stellaris-triggers-modifiers-effects-list"
          >
            stellaris-triggers-modifiers-effects-list
          </Anchor>{" "}
          by OldEnt, a list of Stellaris triggers, modifiers and effects for
          most game versions since launch;
        </List.Item>
        <List.Item>
          <Anchor
            target="_blank"
            href="https://github.com/quetzatcoatl/Stellaris-Moding-Assets"
          >
            Stellaris-Moding-Assets repo
          </Anchor>{" "}
          by quetzatcoatl, a collection of free assets that can be used in any
          mods;
        </List.Item>
        <List.Item>
          <Anchor target="_blank" href="https://github.com/benreid24/Stellaru">
            Stellaru
          </Anchor>{" "}
          by benreid24, a data visualization suite for Stellaris.
        </List.Item>
      </List>
    </Container>
  );
}
