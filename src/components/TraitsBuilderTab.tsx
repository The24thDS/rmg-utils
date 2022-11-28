import {
  Grid,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Flex,
  Switch,
  Slider,
} from "@mantine/core";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Stage, Layer, Circle, Rect } from "react-konva";
import { modifyHSLValue } from "../utils/general";
import ColorPickerElement from "./shared/ColorPickerElement";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import ImagePreview from "./shared/ImagePreview";
import CanvasImage from "./shared/CanvasImage";
import { useDocumentTitle } from "@mantine/hooks";
import DownloadButton from "./shared/DownloadButton";
import { Stage as StageType } from "konva/lib/Stage";

const TRAIT_WIDTH = 29;

// TODO: image size validation
// TODO: analytics?

export default function TraitsBuilderTab() {
  useDocumentTitle("RMG Utils for Stellaris - Traits Builder");
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("hsl(350, 94%, 42%)");
  const bgColorAlt = modifyHSLValue(bgColor, { l: -15 });
  const [iconColor, setIconColor] = useState("hsla(43, 72%, 6%, 1)");
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [iconBlobURL, setIconBlobURL] = useState<null | string>(null);
  const [recolorIcon, setRecolorIcon] = useState(false);
  const [iconScale, setIconScale] = useState(1);
  const [iconXOffset, setIconXOffset] = useState(0);
  const [iconYOffset, setIconYOffset] = useState(0);
  const stageRef = useRef<StageType>(null);

  const iconRef = useCallback(
    (node: HTMLImageElement) => {
      if (node !== null) {
        setIconBlobURL(node.src);
      }
    },
    [files[0]?.path]
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
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <Text size="sm">Preview</Text>
              <Stage width={TRAIT_WIDTH} height={TRAIT_WIDTH} ref={stageRef}>
                <Layer>
                  <Circle
                    x={TRAIT_WIDTH / 2}
                    y={TRAIT_WIDTH / 2}
                    fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                    fillLinearGradientEndPoint={{ x: 0, y: TRAIT_WIDTH }}
                    fillLinearGradientColorStops={[0, bgColor, 0.8, bgColorAlt]}
                    radius={TRAIT_WIDTH / 2}
                  />
                </Layer>
                <Layer>
                  <CanvasImage
                    canvasWidth={TRAIT_WIDTH}
                    imageURL={iconBlobURL}
                    scale={iconScale}
                    xOffset={iconXOffset}
                    yOffset={iconYOffset}
                  />
                  {recolorIcon && (
                    <Rect
                      x={0}
                      y={0}
                      width={TRAIT_WIDTH}
                      height={TRAIT_WIDTH}
                      fill={iconColor}
                      globalCompositeOperation="source-in"
                    />
                  )}
                </Layer>
              </Stage>
              <DownloadButton type="PNG" stage={stageRef.current} name={name} />
              <DownloadButton type="DDS" stage={stageRef.current} name={name} />
            </Stack>
            <Stack spacing="xs">
              <Stack mih={140} spacing={1}>
                <Text size="sm">Icon</Text>
                <Dropzone
                  accept={IMAGE_MIME_TYPE}
                  maxFiles={1}
                  multiple={false}
                  onDrop={setFiles}
                  mb="sm"
                >
                  <Text align="center">Drop your icon here</Text>
                </Dropzone>
                <ImagePreview file={files[0]} ref={iconRef} />
              </Stack>
              <Switch
                label="Recolor icon"
                checked={recolorIcon}
                onChange={(event) =>
                  setRecolorIcon(event.currentTarget.checked)
                }
                onLabel="ON"
                offLabel="OFF"
              />
              <Text size="sm">Icon scale</Text>
              <Slider
                defaultValue={1}
                min={0.1}
                step={0.1}
                max={5}
                marks={[
                  { value: 1, label: "1x" },
                  { value: 5, label: "5x" },
                ]}
                value={iconScale}
                onChange={(v) => setIconScale(Number(v.toFixed(2)))}
              />
              <Text size="sm" mt="sm">
                Icon X offset
              </Text>
              <Slider
                defaultValue={0}
                min={0}
                step={0.1}
                max={30}
                marks={[
                  { value: 0, label: "0" },
                  { value: 30, label: "30" },
                ]}
                value={iconXOffset}
                onChange={(v) => setIconXOffset(Number(v.toFixed(2)))}
              />
              <Text size="sm" mt="sm">
                Icon Y offset
              </Text>
              <Slider
                defaultValue={0}
                min={0}
                step={0.1}
                max={30}
                marks={[
                  { value: 0, label: "0" },
                  { value: 30, label: "30" },
                ]}
                value={iconYOffset}
                onChange={(v) => setIconYOffset(Number(v.toFixed(2)))}
              />
            </Stack>
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={24} lg={16} offsetLg={1}>
          <SimpleGrid cols={2} spacing="xl">
            <ColorPickerElement
              label="Background color"
              value={bgColor}
              setValue={setBgColor}
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
              value={iconColor}
              setValue={setIconColor}
              swatches={["hsla(43, 72%, 6%, 1)"]}
            />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </>
  );
}
