import { useState } from "react";
import { useSetAtom } from "jotai";
import { Button, Grid, Group, Stack } from "@mantine/core";

import { GalaxyMap } from "./GalaxyMap";
import { RightPanel } from "./RightPanel";

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
    <Button variant="outline" loading={isLoading} onClick={handleClick}>
      Load galaxy
    </Button>
  );
};

export const GalaxyBuilderTab = () => {
  return (
    <Grid columns={gridColums} gutter="xl">
      <Grid.Col span={{ base: gridColums, lg: 7 }}>
        <GalaxyMap />
      </Grid.Col>
      <Grid.Col span={{ base: gridColums, sm: 5 }}>
        <Stack>
          <Group grow>
            <Button disabled>New galaxy</Button>
            <LoadGalaxyButton />
            <Button variant="outline" disabled>
              Save galaxy
            </Button>
          </Group>
          <RightPanel />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
