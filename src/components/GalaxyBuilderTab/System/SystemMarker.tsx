import { CircleMarker, Tooltip } from "react-leaflet";
import { PrimitiveAtom, useAtom } from "jotai";

import { System } from "../../../utils/map/System";
import { isSystemItem, selectedItemAtom } from "../../../store/galaxy.store";
import { useCallback } from "react";

export const SystemMarker = ({
  systemAtom,
}: {
  systemAtom: PrimitiveAtom<System>;
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

  return system ? (
    <CircleMarker
      key={`${systemAtom}`}
      center={[system.y, system.x]}
      radius={3}
      eventHandlers={{
        click: setAsSelected,
      }}
      pathOptions={{
        color: isSelected ? "orange" : "#3388ff",
        fillColor: isSelected ? "orange" : "#3388ff",
        fillOpacity: 0.5,
      }}
    >
      <Tooltip pane="popups" className="rmg-leaflet-popup">
        {system.name}
      </Tooltip>
    </CircleMarker>
  ) : null;
};
