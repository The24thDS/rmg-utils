import { Circle, Tooltip } from "react-leaflet";
import { PrimitiveAtom, useAtom } from "jotai";

import { Nebula } from "../../../utils/map/Nebula";
import { selectedItemAtom } from "../../../store/galaxy.store";
import { useMarkerDraggingEventHandlers } from "../../../hooks";

export const NebulaMarker = ({
  nebulaAtom,
}: {
  nebulaAtom: PrimitiveAtom<Nebula>;
}) => {
  const [nebula, setNebula] = useAtom(nebulaAtom);
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  const isSelected =
    selectedItem?.type === "nebula" && selectedItem.id === nebula.id;

  const setAsSelected = () => {
    setSelectedItem({
      type: "nebula",
      id: nebula.id,
      atom: nebulaAtom,
    });
  };

  const updateNebulaCoords = ({ lat, lng }: { lat: number; lng: number }) => {
    setAsSelected();
    setNebula((prevNebula) => {
      const newNebula = new Nebula(prevNebula.toString(), prevNebula.id);
      newNebula.x = Math.round(lng);
      newNebula.y = Math.round(lat);
      return newNebula;
    });
  };

  const draggingEventHandlers =
    useMarkerDraggingEventHandlers(updateNebulaCoords);

  return nebula ? (
    <Circle
      key={nebula.id}
      center={[nebula.y, nebula.x]}
      radius={nebula.radius}
      pathOptions={{
        color: isSelected ? "orange" : "purple",
        fillColor: isSelected ? "orange" : "purple",
        fillOpacity: 0.5,
      }}
      eventHandlers={{
        click: setAsSelected,
        ...draggingEventHandlers,
      }}
    >
      <Tooltip pane="popups">{nebula.name}</Tooltip>
    </Circle>
  ) : null;
};
