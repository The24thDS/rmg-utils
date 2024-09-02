import { CircleMarker, Tooltip } from "react-leaflet";
import { PrimitiveAtom, useAtom } from "jotai";

import { System } from "../../../utils/map/System";
import { isSystemItem, selectedItemAtom } from "../../../store/galaxy.store";
import { useCallback } from "react";
import {
  useMapItemContextMenu,
  useMarkerDraggingEventHandlers,
} from "../../../hooks";

export const SystemMarker = ({
  systemAtom,
  remove,
}: {
  systemAtom: PrimitiveAtom<System>;
  remove: () => void;
}) => {
  const [system, setSystem] = useAtom(systemAtom);
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  const isSelected =
    isSystemItem(selectedItem) && selectedItem.id === system.id;

  const setAsSelected = useCallback(() => {
    setSelectedItem({
      type: "system",
      id: system.id,
      atom: systemAtom,
    });
  }, [system.id, systemAtom, setSelectedItem]);

  const removeSystem = () => {
    setSelectedItem(null);
    remove();
  };

  const updateSystemCoords = ({ lat, lng }: { lat: number; lng: number }) => {
    setAsSelected();
    setSystem((prevSystem) => {
      const newSystem = new System(prevSystem.toString());
      newSystem.x = Math.round(lng);
      newSystem.y = Math.round(lat);
      return newSystem;
    });
  };

  const draggingEventHandlers = useMarkerDraggingEventHandlers(
    isSelected,
    updateSystemCoords
  );
  const contextmenu = useMapItemContextMenu(isSelected, {
    move: setAsSelected,
    edit: setAsSelected,
    remove: removeSystem,
  });

  return system ? (
    <CircleMarker
      key={`${systemAtom}`}
      center={[system.y, system.x]}
      radius={3}
      pathOptions={{
        color: isSelected ? "orange" : "#3388ff",
        fillColor: isSelected ? "orange" : "#3388ff",
        fillOpacity: 0.5,
      }}
      eventHandlers={{
        click: setAsSelected,
        ...draggingEventHandlers,
        contextmenu,
      }}
    >
      <Tooltip pane="popups" className="rmg-leaflet-popup">
        {system.name}
      </Tooltip>
    </CircleMarker>
  ) : null;
};
