import { useAtom, useAtomValue } from "jotai";
import { useMap } from "react-leaflet";
import { useContextMenu } from "mantine-contextmenu";
import { IconArrowsMove, IconEdit, IconTrash } from "@tabler/icons";

import { selectedActionAtom } from "../store/galaxy.store";

type OnMoveFn = (latlng: L.LatLng) => void;

export const useMarkerDraggingEventHandlers = (
  isSelected: boolean,
  onMove: OnMoveFn
) => {
  const map = useMap();
  const selectedAction = useAtomValue(selectedActionAtom);
  const isMoveAction = selectedAction === "move";

  return {
    mousedown:
      isMoveAction && isSelected
        ? (e: L.LeafletMouseEvent) => {
            if (e.originalEvent.button === 0) {
              map.on("mousemove", (e) => {
                map.dragging.disable();
                onMove(e.latlng);
              });
            }
          }
        : undefined,
    mouseup:
      isMoveAction && isSelected
        ? (e: L.LeafletMouseEvent) => {
            if (e.originalEvent.button === 0) {
              map.dragging.enable();
              map.off("mousemove");
            }
          }
        : undefined,
  };
};

interface MapItemActions {
  move: () => void;
  edit: () => void;
  remove: () => void;
}

export const useMapItemContextMenu = (
  isSelected: boolean,
  actions: MapItemActions
) => {
  const showContextMenu = useContextMenu();
  const [selectedAction, setSelectedAction] = useAtom(selectedActionAtom);

  return (e: L.LeafletMouseEvent) => {
    e.originalEvent.preventDefault();
    showContextMenu([
      {
        key: "move",
        disabled: selectedAction === "move" && isSelected,
        icon: <IconArrowsMove size="1rem" />,
        onClick: () => {
          setSelectedAction("move");
          actions.move();
        },
      },
      {
        key: "edit",
        disabled: selectedAction === "edit" && isSelected,
        icon: <IconEdit size="1rem" />,
        onClick: () => {
          setSelectedAction("edit");
          actions.edit();
        },
      },
      { key: "divider" },
      {
        key: "delete",
        color: "red",
        icon: <IconTrash size="1rem" />,
        onClick: actions.remove,
      },
      // @ts-ignore
    ])(e.originalEvent);
  };
};
