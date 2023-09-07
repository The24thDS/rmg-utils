import { useAtomValue } from "jotai";
import { useMap } from "react-leaflet";

import { selectedActionAtom } from "../store/galaxy.store";

type OnMoveFn = (latlng: L.LatLng) => void;

export const useMarkerDraggingEventHandlers = (onMove: OnMoveFn) => {
  const map = useMap();
  const selectedAction = useAtomValue(selectedActionAtom);
  const isMoveAction = selectedAction === "move";

  return {
    mousedown: isMoveAction
      ? () => {
          map.on("mousemove", (e) => {
            map.dragging.disable();
            onMove(e.latlng);
          });
        }
      : undefined,
    mouseup: isMoveAction
      ? () => {
          map.dragging.enable();
          map.off("mousemove");
        }
      : undefined,
  };
};
