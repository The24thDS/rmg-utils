import { ColorPicker, Stack, TextInput } from "@mantine/core";
import { ColorFormat } from "@mantine/core/lib/ColorPicker/types";

interface ColorPickerElementProps {
  value: string;
  setValue: (v: string) => void;
  label: string;
  swatches?: string[];
  swatchesPerRow?: number;
  format?: ColorFormat;
}

export default function ColorPickerElement({
  value,
  setValue,
  label,
  swatches,
  swatchesPerRow = 8,
  format = "hsl",
}: ColorPickerElementProps) {
  return (
    <Stack>
      <TextInput
        label={label}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <ColorPicker
        format={format}
        value={value}
        onChange={setValue}
        fullWidth
        swatches={swatches}
        swatchesPerRow={swatchesPerRow}
      />
    </Stack>
  );
}
