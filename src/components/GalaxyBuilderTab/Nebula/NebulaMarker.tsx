import { Circle, Tooltip } from "react-leaflet";
import { PrimitiveAtom, useAtom } from "jotai";

import { Nebula } from "../../../utils/map/Nebula";
import { selectedItemAtom } from "../../../store/galaxy.store";
import {
  useMapItemContextMenu,
  useMarkerDraggingEventHandlers,
} from "../../../hooks";

export const NebulaMarker = ({
  nebulaAtom,
  remove,
}: {
  nebulaAtom: PrimitiveAtom<Nebula>;
  remove: () => void;
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

  const removeNebula = () => {
    setSelectedItem(null);
    remove();
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

  const draggingEventHandlers = useMarkerDraggingEventHandlers(
    isSelected,
    updateNebulaCoords
  );
  const contextmenu = useMapItemContextMenu(isSelected, {
    move: setAsSelected,
    edit: setAsSelected,
    remove: removeNebula,
  });

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
        contextmenu,
      }}
    >
      <Tooltip pane="popups" className="rmg-leaflet-popup">
        {nebula.name}
      </Tooltip>
    </Circle>
  ) : null;
};
