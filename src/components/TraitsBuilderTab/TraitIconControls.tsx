import { Switch, NumberInput, Flex } from "@mantine/core";
import { TraitStateActionType } from "./index.d";

interface TraitIconControlsProps {
  recolorIcon: boolean;
  dispatch: (props: { type: TraitStateActionType; value: any }) => void;
}

export default function TraitIconControls({
  recolorIcon,
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
      <NumberInput
        label="Scale"
        defaultValue={1}
        onChange={(v) => {
          if (v !== "") {
            dispatch({ type: "set_iconScale", value: v });
          }
        }}
        precision={3}
        step={0.1}
        min={0.001}
        stepHoldDelay={500}
        stepHoldInterval={100}
      />
      <Flex gap={8}>
        <NumberInput
          label="X offset"
          defaultValue={0}
          onChange={(v) => {
            if (v !== "") {
              dispatch({ type: "set_iconXOffset", value: v });
            }
          }}
          precision={1}
          stepHoldDelay={500}
          stepHoldInterval={100}
        />
        <NumberInput
          label="Y offset"
          defaultValue={0}
          onChange={(v) => {
            if (v !== "") {
              dispatch({ type: "set_iconYOffset", value: v });
            }
          }}
          precision={1}
          stepHoldDelay={500}
          stepHoldInterval={100}
        />
      </Flex>
    </>
  );
}
