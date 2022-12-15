import { Text, Switch, Slider } from "@mantine/core";
import { TraitStateActionType } from "./TraitsBuilderTab";

interface TraitIconControlsProps {
  recolorIcon: boolean;
  iconScale: number;
  iconXOffset: number;
  iconYOffset: number;
  dispatch: (props: { type: TraitStateActionType; value: any }) => void;
}

const OFFSET_MARKERS = [
  { value: -30, label: "-30" },
  { value: 0, label: "0" },
  { value: 30, label: "30" },
];

export default function TraitIconControls({
  recolorIcon,
  iconScale,
  iconXOffset,
  iconYOffset,
  dispatch,
}: TraitIconControlsProps) {
  return (
    <>
      <Switch
        label="Recolor icon"
        checked={recolorIcon}
        onChange={(event) =>
          dispatch({
            type: "set_recolorIcon",
            value: event.currentTarget.checked,
          })
        }
        onLabel="ON"
        offLabel="OFF"
      />
      <Text size="sm">Icon scale</Text>
      <Slider
        defaultValue={1}
        min={0.01}
        step={0.01}
        max={5}
        marks={[
          { value: 1, label: "1x" },
          { value: 5, label: "5x" },
        ]}
        value={iconScale}
        onChange={(v) =>
          dispatch({ type: "set_iconScale", value: Number(v.toFixed(2)) })
        }
      />
      <Text size="sm" mt="sm">
        Icon X offset
      </Text>
      <Slider
        defaultValue={0}
        min={-30}
        step={0.1}
        max={30}
        marks={OFFSET_MARKERS}
        value={iconXOffset}
        onChange={(v) =>
          dispatch({ type: "set_iconXOffset", value: Number(v.toFixed(2)) })
        }
      />
      <Text size="sm" mt="sm">
        Icon Y offset
      </Text>
      <Slider
        defaultValue={0}
        min={-30}
        step={0.1}
        max={30}
        marks={OFFSET_MARKERS}
        value={iconYOffset}
        onChange={(v) =>
          dispatch({ type: "set_iconYOffset", value: Number(v.toFixed(2)) })
        }
      />
    </>
  );
}
