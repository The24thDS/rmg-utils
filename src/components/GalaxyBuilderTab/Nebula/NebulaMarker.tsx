import { Circle, Tooltip } from "react-leaflet";
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";

import { Nebula } from "../../../utils/map/Nebula";
import { useMapDragging } from "../../../hooks/useMapHooks";
import { selectedItemAtom } from "../../../store/galaxy.store";

export const NebulaMarker = ({
  nebulaAtom,
}: {
  nebulaAtom: PrimitiveAtom<Nebula>;
}) => {
  const [nebula, setNebula] = useAtom(nebulaAtom);
  const setSelectedItem = useSetAtom(selectedItemAtom);

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
      eventHandlers={{
        click: (e) => {
          setSelectedItem({
            type: "nebula",
            id: nebula.id,
            atom: nebulaAtom,
          });
        },
      }}
    >
      <Tooltip pane="popups">{nebula.name}</Tooltip>
    </Circle>
  ) : null;
};
