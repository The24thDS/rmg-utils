import { useState } from "react";
import { useSetAtom } from "jotai";
import { Button, Grid, Stack } from "@mantine/core";

import { GalaxyMap } from "./GalaxyMap";
import { parseData } from "../../utils/galaxyBuilder";
import { nebulasAtom } from "../../store/nebulas.store";

const gridColums = 12;

const LoadGalaxyButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setNebulas = useSetAtom(nebulasAtom);

  const handleClick = () => {
    setIsLoading(true);
    const { systems, hyperlanes, nebulas } = parseData();
    console.debug(`${systems.size} systems loaded.`);
    console.debug(`${hyperlanes.length} hyperlanes loaded.`);
    console.debug(`${nebulas.length} nebulas loaded.`);
    setNebulas(nebulas);
    setIsLoading(false);
  };

  return (
    <Button
      variant="light"
      color="blue"
      loading={isLoading}
      onClick={handleClick}
    >
      Load Galaxy
    </Button>
  );
};

export const GalaxyBuilderTab = () => {
  return (
    <Grid columns={gridColums}>
      <Grid.Col span={gridColums} sm={3}>
        <Stack>
          <LoadGalaxyButton />
          {/* TODO: Add system controls: Add, Delete, Move */}
          {/* TODO: Add hyperlane controls: Add, Delete */}
          {/* TODO: Add nebula controls: Add, Delete, Move */}
        </Stack>
      </Grid.Col>
      <Grid.Col span={gridColums} lg={8} offsetLg={1}>
        <GalaxyMap />
      </Grid.Col>
    </Grid>
  );
};
