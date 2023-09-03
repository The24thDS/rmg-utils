import { useEffect, useRef, useState } from "react";
import { Popup, Circle, useMap } from "react-leaflet";
import {
  Button,
  Group,
  MantineProvider,
  NumberInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { Nebula } from "../../utils/map/Nebula";

export const NebulaMarker = ({ nebula }: { nebula: Nebula }) => {
  const ref = useRef<L.Circle<any>>(null);
  const map = useMap();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.on("mousedown", () => {
      ref.current?.on("mousemove", (e) => {
        map.dragging.disable();
        ref.current?.closePopup();
        const { lat, lng } = e.latlng;
        ref.current?.setLatLng([lat, lng]);
      });
    });
    ref.current.on("mouseup", () => {
      map.dragging.enable();
      ref.current?.off("mousemove");
    });
  }, [map.dragging]);

  return (
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
        {isEditing ? (
          <MantineProvider theme={{ colorScheme: "light" }}>
            <TextInput label="id" disabled defaultValue={nebula.id} />
            <TextInput label="name" defaultValue={nebula.name} />
            <Group spacing="xs" grow>
              <NumberInput
                label="x"
                defaultValue={nebula.x}
                style={{ width: "80px" }}
                max={500}
                min={-500}
              />
              <NumberInput
                label="y"
                defaultValue={nebula.y}
                style={{ width: "80px" }}
                max={500}
                min={-500}
              />
            </Group>
            <Group>
              <Button size="xs" onClick={() => setIsEditing(false)}>
                Save
              </Button>
              <Button
                size="xs"
                variant="subtle"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Group>
          </MantineProvider>
        ) : (
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
        )}
      </Popup>
    </Circle>
  );
};
