import {
  Anchor,
  Badge,
  Container,
  Kbd,
  List,
  Text,
  Title,
} from "@mantine/core";
import { dateFormatter, isDNTEnabled } from "../utils/general";

const PRIVACY_POLICY_LAST_UPDATE = new Date("2022-09-03");
const CONTACT_EMAIL = "renegades.modding.group@gmail.com";
const DISCORD_LINK = "https://discord.gg/2ZG9K7ucyJ";
const DNTstatus = isDNTEnabled() ? "ENABLED" : "DISABLED";
const DNTstatusColor = isDNTEnabled() ? "green" : "red";

export default function Privacy() {
  return (
    <Container>
      <Title order={1} sx={(theme) => ({ fontSize: theme.fontSizes.xl * 2.5 })}>
        Privacy policy
      </Title>
      <Text my="md" size="xl">
        <em>
          Last updated: {dateFormatter.format(PRIVACY_POLICY_LAST_UPDATE)}
        </em>
      </Text>
      <Text size="xl">
        The privacy of your data — and it is your data, not ours! — is a big
        deal to us. In this policy, we lay out: what data we collect and why;
        how your data is handled; and your rights with respect to your data. We
        promise we never sell your data: never have, never will.
      </Text>
      <Text size="xl" mt="sm">
        For contact information check the last section on this page.
      </Text>
      <Title order={2} my="md">
        What we collect and why
      </Title>
      <Text size="xl">
        Our guiding principle is to collect only what we need. Here's what that
        means in practice:
      </Text>
      <Title order={3} my="sm">
        Identity
      </Title>
      <Text size="xl">
        We don't collect any personal information that can tie any action to
        yourself.
      </Text>
      <Title order={3} my="sm">
        Website interactions
      </Title>
      <Text size="xl">
        We collect information about your browsing activity on this website for
        analytics and statistical purposes such as conversion rate testing and
        experimenting with new features. This includes, for example, your
        browser and operating system version, your country, which web pages you
        visited and how long you stayed on them, and which website referred you
        to us.
      </Text>
      <Title order={3} my="sm">
        Product interactions
      </Title>
      <Text size="xl">
        We save information about the events that you trigger while using our
        products. This can include, for example, the buttons that you pressed or
        the number of locators you generated. This information is collected for
        statistical purposes only.
      </Text>
      <Title order={3} my="sm">
        Geolocation data
      </Title>
      <Text size="xl">
        We don't log your full IP address while using our web app, but we do use
        your IP address to determine the country you are using it from.
      </Text>
      <Title order={3} my="sm">
        Data collected for debugging
      </Title>
      <Text size="xl">
        We will store information about software failures regarding the web
        application. This information is for internal use only and will not be
        distributed under any circumstance. Your personal data is removed from
        bug reports before submitting it and will only include technical details
        or an anonymous identifier.
      </Text>
      <Title order={3} my="sm">
        Advertising and Cookies
      </Title>
      <List size="xl">
        <List.Item>We do not run any ads from third-party platforms.</List.Item>
        <List.Item>
          We do not use third-party cookies or send any information to
          third-parties.
        </List.Item>
        <List.Item>
          We use first-party cookies to keep track of the color theme you set.
        </List.Item>
      </List>
      <Title order={3} my="sm">
        Voluntary correspondence
      </Title>
      <Text size="xl">
        When you email us with a question or to ask for help, we keep that
        correspondence, including your email address, so that we have a history
        of past correspondence to reference if you reach out in the future.
      </Text>
      <Text size="xl" mt="sm">
        If you contact us on Discord, we may decide to keep screenshots of the
        conversation for the same reasons.
      </Text>
      <Title order={2} my="md">
        No sharing of information
      </Title>
      <Text size="xl">
        Except as may be stated expressly in this Privacy Policy, we will not
        share personal information that you give us with any third parties. All
        the analytics and debug information that we collect it's stored by us.
      </Text>
      <Title order={2} my="md">
        Your rights and choices
      </Title>
      <Text size="xl">
        You do have the right to opt out of all the data collection described in
        this Privacy Policy. You can do this using the{" "}
        <strong>Do Not Track Me</strong> toggle in your browser settings.
      </Text>
      <Text size="xl" mt="sm">
        Currently, <strong>Do Not Track Me</strong> is{" "}
        <Badge size="lg" color={DNTstatusColor} variant="filled">
          {DNTstatus}
        </Badge>
        . If you change it please refresh the page to pick up the new value.
      </Text>
      <Title order={2} my="md">
        Data location
      </Title>
      <Text size="xl">
        The data that we collect is stored by us inside the EU. It will never be
        transferred out of this jurisdiction.
      </Text>
      <Title order={2} my="md">
        Changes
      </Title>
      <Text size="xl">
        We may update this policy as needed to comply with relevant regulations
        and reflect any new practices. Whenever we make a significant change to
        our policies, we will refresh the date at the top of this page and take
        any other appropriate steps to notify users.
      </Text>
      <Title order={2} my="md">
        How to contact us
      </Title>
      <Text size="xl">
        If you have any question or concern about the privacy of the information
        as used and collected within our site or any other questions about this
        Privacy Policy, please send us a thorough description using one of the
        options below:
      </Text>
      <List size="xl">
        <List.Item>
          an email to{" "}
          <Anchor href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Anchor> with
          the subject <em>"Privacy Policy"</em>
        </List.Item>
        <List.Item>
          joining our Discord server by clicking this link{" "}
          <Anchor href={DISCORD_LINK}>{DISCORD_LINK}</Anchor> and opening a
          ticket using the <Kbd>/ticket</Kbd> command
        </List.Item>
      </List>
      <Text size="lg" mt="md">
        Adapted from the Basecamp{" "}
        <Anchor href="https://github.com/basecamp/policies">
          open-source policies{" "}
        </Anchor>
        /{" "}
        <Anchor href="https://creativecommons.org/licenses/by/4.0/">
          CC BY 4.0
        </Anchor>
      </Text>
    </Container>
  );
}
