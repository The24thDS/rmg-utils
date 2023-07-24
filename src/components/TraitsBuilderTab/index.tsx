import { Flex, Grid, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useCallback, useReducer, useRef } from "react";
import * as Sentry from "@sentry/browser";
import {
  isDNTEnabled,
  modifyHSLValue,
  netlifyFunctionInvoke,
} from "../../utils/general";
import ColorPickerElement from "../shared/ColorPickerElement";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import ImagePreview from "../shared/ImagePreview";
import { useDocumentTitle } from "@mantine/hooks";
import DownloadButton from "../shared/DownloadButton";
import { Stage as StageType } from "konva/lib/Stage";
import TraitIconControls from "./TraitIconControls";
import { NetlifyFunctions } from "../../constants";
import TraitStage from "./TraitStage";
import {
  traitsBackgroundColors,
  traitsBuilderReducer,
} from "./traits-builder.utils";
import { State } from "./index.d";

const TRAIT_WIDTH = 29;

const INITIAL_STATE: State = {
  name: "",
  bgColor: "hsl(350, 94%, 42%)",
  bgColorAlt: modifyHSLValue("hsl(350, 94%, 42%)", { l: -15 }),
  iconColor: "hsla(43, 72%, 6%, 1)",
  files: [],
  iconBlobURL: null,
  recolorIcon: false,
  iconScale: 1,
  iconXOffset: 0,
  iconYOffset: 0,
};

export default function TraitsBuilderTab() {
  useDocumentTitle("RMG Utils for Stellaris - Traits Builder");
  const [state, dispatch] = useReducer(traitsBuilderReducer, INITIAL_STATE);
  const mainStageRef = useRef<StageType>(null);

  const iconRef = useCallback(
    (node: HTMLImageElement) => {
      if (node !== null) {
        dispatch({ type: "set_iconBlobURL", value: node.src });
      }
    },
    [state.files[0]?.path]
  );

  const postAnalytics = async (type: "PNG" | "DDS") => {
    if (!isDNTEnabled()) {
      window.umami.track(`download-trait-${type}`);
      const body = { type, state };
      try {
        await netlifyFunctionInvoke(
          NetlifyFunctions.SAVE_TRAITS_INTERACTIONS,
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
        Use your own icon to build a custom trait icon. You have controls for
        the background color, icon scale and color. Once you are pleased with
        the result you can download it in PNG or DDS format.
      </Text>
      <Grid columns={24}>
        <Grid.Col span={24} sm={7}>
          <SimpleGrid cols={2}>
            <Stack>
              <TextInput
                label="Name"
                value={state.name}
                onChange={(event) =>
                  dispatch({
                    type: "set_name",
                    value: event.currentTarget.value,
                  })
                }
              />
              <Text size="sm">Preview</Text>
              <Flex justify="space-between" align="center">
                <TraitStage
                  state={state}
                  traitWidth={TRAIT_WIDTH}
                  stageRef={mainStageRef}
                />
                <TraitStage
                  state={state}
                  traitWidth={TRAIT_WIDTH}
                  factor={1.5}
                />
                <TraitStage
                  state={state}
                  traitWidth={TRAIT_WIDTH}
                  factor={2.0}
                />
              </Flex>
              <DownloadButton
                type="PNG"
                stage={mainStageRef.current}
                name={state.name}
                triggerAnalytics={postAnalytics}
              />
              <DownloadButton
                type="DDS"
                stage={mainStageRef.current}
                name={state.name}
                triggerAnalytics={postAnalytics}
              />
            </Stack>
            <Stack spacing="xs">
              <Stack mih={140} spacing={1}>
                <Text size="sm">Icon</Text>
                <Dropzone
                  accept={IMAGE_MIME_TYPE}
                  maxFiles={1}
                  multiple={false}
                  onDrop={(v) => dispatch({ type: "set_files", value: v })}
                  mb="sm"
                >
                  <Text align="center">Drop your icon here</Text>
                </Dropzone>
                <ImagePreview file={state.files[0]} ref={iconRef} />
              </Stack>
              <TraitIconControls
                recolorIcon={state.recolorIcon}
                dispatch={dispatch}
              />
            </Stack>
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={24} lg={16} offsetLg={1}>
          <SimpleGrid cols={2} spacing="xl">
            <ColorPickerElement
              label="Background color"
              value={state.bgColor}
              setValue={(v) => dispatch({ type: "set_bgColor", value: v })}
              swatches={traitsBackgroundColors}
              swatchesPerRow={6}
            />
            <ColorPickerElement
              label="Icon color"
              format="hsla"
              value={state.iconColor}
              setValue={(v) => dispatch({ type: "set_iconColor", value: v })}
              swatches={["hsla(43, 72%, 6%, 1)"]}
              swatchesPerRow={3.55}
            />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </>
  );
}
