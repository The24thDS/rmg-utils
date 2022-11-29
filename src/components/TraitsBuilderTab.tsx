import { Grid, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useCallback, useReducer, useRef, useState } from "react";
import { Stage, Layer, Circle, Rect } from "react-konva";
import { modifyHSLValue } from "../utils/general";
import ColorPickerElement from "./shared/ColorPickerElement";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import ImagePreview from "./shared/ImagePreview";
import CanvasImage from "./shared/CanvasImage";
import { useDocumentTitle } from "@mantine/hooks";
import DownloadButton from "./shared/DownloadButton";
import { Stage as StageType } from "konva/lib/Stage";
import TraitIconControls from "./TraitIconControls";

const TRAIT_WIDTH = 29;

interface State {
  name: string;
  bgColor: string;
  bgColorAlt: string;
  iconColor: string;
  files: FileWithPath[];
  iconBlobURL: null | string;
  recolorIcon: boolean;
  iconScale: number;
  iconXOffset: number;
  iconYOffset: number;
}

export type TraitStateActionType =
  | "set_name"
  | "set_bgColor"
  | "set_iconColor"
  | "set_files"
  | "set_iconBlobURL"
  | "set_recolorIcon"
  | "set_iconScale"
  | "set_iconXOffset"
  | "set_iconYOffset";

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

const reducer = (
  state: State,
  action: { type: TraitStateActionType; value: any }
): State => {
  switch (action.type) {
    case "set_name":
      return {
        ...state,
        name: action.value,
      };
    case "set_bgColor":
      return {
        ...state,
        bgColor: action.value,
        bgColorAlt: modifyHSLValue(action.value, { l: -15 }),
      };
    case "set_iconColor":
      return {
        ...state,
        iconColor: action.value,
      };
    case "set_files":
      return {
        ...state,
        files: action.value,
      };
    case "set_iconBlobURL":
      return {
        ...state,
        iconBlobURL: action.value,
      };
    case "set_recolorIcon":
      return {
        ...state,
        recolorIcon: action.value,
      };
    case "set_iconScale":
      return {
        ...state,
        iconScale: action.value,
      };
    case "set_iconXOffset":
      return {
        ...state,
        iconXOffset: action.value,
      };
    case "set_iconYOffset":
      return {
        ...state,
        iconYOffset: action.value,
      };
    default:
      return state;
  }
};

// TODO: image size validation
// TODO: analytics?

export default function TraitsBuilderTab() {
  useDocumentTitle("RMG Utils for Stellaris - Traits Builder");
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const stageRef = useRef<StageType>(null);

  const iconRef = useCallback(
    (node: HTMLImageElement) => {
      if (node !== null) {
        dispatch({ type: "set_iconBlobURL", value: node.src });
      }
    },
    [state.files[0]?.path]
  );

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
              <Stage width={TRAIT_WIDTH} height={TRAIT_WIDTH} ref={stageRef}>
                <Layer>
                  <Circle
                    x={TRAIT_WIDTH / 2}
                    y={TRAIT_WIDTH / 2}
                    fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                    fillLinearGradientEndPoint={{ x: 0, y: TRAIT_WIDTH }}
                    fillLinearGradientColorStops={[
                      0,
                      state.bgColor,
                      0.8,
                      state.bgColorAlt,
                    ]}
                    radius={TRAIT_WIDTH / 2}
                  />
                </Layer>
                <Layer>
                  <CanvasImage
                    canvasWidth={TRAIT_WIDTH}
                    imageURL={state.iconBlobURL}
                    scale={state.iconScale}
                    xOffset={state.iconXOffset}
                    yOffset={state.iconYOffset}
                  />
                  {state.recolorIcon && (
                    <Rect
                      x={0}
                      y={0}
                      width={TRAIT_WIDTH}
                      height={TRAIT_WIDTH}
                      fill={state.iconColor}
                      globalCompositeOperation="source-in"
                    />
                  )}
                </Layer>
              </Stage>
              <DownloadButton
                type="PNG"
                stage={stageRef.current}
                name={state.name}
              />
              <DownloadButton
                type="DDS"
                stage={stageRef.current}
                name={state.name}
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
                iconScale={state.iconScale}
                iconXOffset={state.iconXOffset}
                iconYOffset={state.iconYOffset}
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
              swatches={[
                "hsl(350, 94%, 42%)",
                "hsl(177, 91%, 43%)",
                "hsl(166, 100%, 41%)",
                "hsl(43, 94%, 57%)",
              ]}
            />
            <ColorPickerElement
              label="Icon color"
              format="hsla"
              value={state.iconColor}
              setValue={(v) => dispatch({ type: "set_iconColor", value: v })}
              swatches={["hsla(43, 72%, 6%, 1)"]}
            />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </>
  );
}
