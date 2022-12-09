import {
  Button,
  CopyButton,
  Grid,
  NumberInput,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useDocumentTitle, useInputState } from "@mantine/hooks";
import * as Sentry from "@sentry/browser";
import { NetlifyFunctions } from "../constants";
import { makeLocators } from "../utils/factories";
import { isDNTEnabled, netlifyFunctionInvoke } from "../utils/general";

const gridColums = 12;

export default function LightLocatorsGeneratorTab() {
  const [locators, setLocators] = useInputState(10);
  const [stateTime, setStateTime] = useInputState(5);
  const [generatedLocators, setGeneratedLocators] = useInputState("");
  useDocumentTitle("RMG Utils for Stellaris - Light Locators Generator");

  const onGenerateClick = async () => {
    const result = makeLocators(locators, stateTime);
    setGeneratedLocators(result.join("\n"));
    if (!isDNTEnabled()) {
      const body = { locators, stateTime, type: "generate" };
      try {
        await netlifyFunctionInvoke(
          NetlifyFunctions.SAVE_LOCATORS_INTERACTIONS,
          { "Content-Type": "application/json" },
          body
        );
      } catch (e) {
        Sentry.withScope((scope) => {
          scope.setContext("post data", body);
          Sentry.captureException(e);
        });
      }
    }
  };

  const onCopyClick = async (copy: Function) => {
    copy();
    if (!isDNTEnabled()) {
      const body = {
        locators: generatedLocators.split("\n").length,
        stateTime,
        type: "copy",
      };
      try {
        await netlifyFunctionInvoke(
          NetlifyFunctions.SAVE_LOCATORS_INTERACTIONS,
          { "Content-Type": "application/json" },
          body
        );
      } catch (e) {
        Sentry.withScope((scope) => {
          scope.setContext("post data", body);
          Sentry.captureException(e);
        });
      }
    }
  };

  return (
    <>
      <Text size="lg" mb="sm">
        This will help you generate light locators for ships quickly. Just input
        the number of locators you need, the state time value and hit the
        button.
      </Text>
      <Grid columns={gridColums}>
        <Grid.Col span={gridColums} sm={3}>
          <Stack>
            <NumberInput
              value={locators}
              onChange={setLocators}
              description="The number of light locators you have"
              label="Locators number"
              min={1}
              required
            />
            <NumberInput
              value={stateTime}
              onChange={setStateTime}
              description="How long is this state in seconds. Usually it's 5 seconds"
              label="State time"
              min={1}
              required
            />
            <Button
              onClick={onGenerateClick}
              className="umami--click--generate-light-locators-button"
            >
              Generate locators
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col span={gridColums} lg={8} offsetLg={1}>
          <Stack>
            <Textarea
              value={generatedLocators}
              onChange={setGeneratedLocators}
              label="Generated locators"
              description="The generated locators will show here"
              autosize
              minRows={5}
              maxRows={15}
              readOnly
            />
            <CopyButton value={generatedLocators}>
              {({ copied, copy }) => (
                <Button
                  color={copied ? "teal" : "blue"}
                  onClick={() => onCopyClick(copy)}
                  styles={{ root: { alignSelf: "flex-end" } }}
                  className="umami--click--copy-light-locators-button"
                >
                  {copied ? "Done!" : "Copy locators to clipboard"}
                </Button>
              )}
            </CopyButton>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}
