import { CircleMarker, Tooltip } from "react-leaflet";
import { PrimitiveAtom, useAtomValue } from "jotai";

import { System } from "../../../utils/map/System";

export const SystemMarker = ({
  systemAtom,
}: {
  systemAtom: PrimitiveAtom<System>;
}) => {
  const system = useAtomValue(systemAtom);

  return system ? (
    <CircleMarker
      key={`${systemAtom}`}
      center={[system.y, system.x]}
      radius={3}
    >
      <Tooltip pane="popups" className="rmg-leaflet-popup">
        {system.name}
      </Tooltip>
    </CircleMarker>
  ) : null;
};
