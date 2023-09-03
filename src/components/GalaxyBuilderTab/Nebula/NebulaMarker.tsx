import { useState } from "react";
import { Circle, Popup } from "react-leaflet";
import { PrimitiveAtom, useAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";
import { Button, Text, Title } from "@mantine/core";

import { Nebula } from "../../../utils/map/Nebula";
import { useMapDragging } from "../../../hooks/useMapHooks";

export const NebulaMarker = ({
  nebulaAtom,
}: {
  nebulaAtom: PrimitiveAtom<Nebula>;
}) => {
  const [nebula, setNebula] = useAtom(nebulaAtom);
  const [isEditing, setIsEditing] = useState(false);

  const updateNebulaCoords = useDebouncedCallback(
    (lat: number, lng: number) => {
      setNebula((prevNebula) => {
        const newNebula = new Nebula(prevNebula.toString(), prevNebula.id);
        newNebula.x = lng;
        newNebula.y = lat;
        return newNebula;
      });
    },
    500
  );

  const ref = useMapDragging(updateNebulaCoords);

  return nebula ? (
    <Circle
      key={nebula.id}
      center={[nebula.y, nebula.x]}
      radius={nebula.radius}
      fillOpacity={0.5}
      fillColor="purple"
      pathOptions={{ color: "purple" }}
      ref={ref}
    >
      <Popup
        pane="popups"
        minWidth={180}
        maxWidth={500}
        interactive
        closeOnClick={false}
      >
        <>
          <Text size="xs">id: {nebula.id}</Text>
          <Title order={5}>{nebula.name}</Title>
          <Text size="sm">
            x: {nebula.x} | y: {nebula.y}
          </Text>
          <Button size="xs" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </>
      </Popup>
    </Circle>
  ) : null;
};
