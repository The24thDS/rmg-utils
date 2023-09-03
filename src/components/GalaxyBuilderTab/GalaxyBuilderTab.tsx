import { Grid, Stack } from "@mantine/core";
import { parseData } from "../../utils/galaxyBuilder";
import { GalaxyMap } from "./GalaxyMap";

const gridColums = 12;

export const GalaxyBuilderTab = () => {
  const { systems, hyperlanes, nebulas } = parseData();

  console.debug(`${systems.size} systems loaded.`);
  console.debug(`${hyperlanes.length} hyperlanes loaded.`);
  console.debug(`${nebulas.size} nebulas loaded.`);
  return (
    <Grid columns={gridColums}>
      <Grid.Col span={gridColums} sm={3}>
        <Stack>
          {/* TODO: Add system controls: Add, Delete, Move */}
          {/* TODO: Add hyperlane controls: Add, Delete */}
          {/* TODO: Add nebula controls: Add, Delete, Move */}
        </Stack>
      </Grid.Col>
      <Grid.Col span={gridColums} lg={8} offsetLg={1}>
        <GalaxyMap
          systems={systems}
          hyperlanes={hyperlanes}
          nebulas={nebulas}
        />
      </Grid.Col>
    </Grid>
  );
};
