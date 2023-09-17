import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMap } from "react-leaflet";
import { useContextMenu } from "mantine-contextmenu";
import {
  IconArrowsMove,
  IconCirclePlus,
  IconEdit,
  IconNewSection,
  IconTrash,
} from "@tabler/icons";

import { selectedActionAtom } from "../store/galaxy.store";
import {
  nebulasAtomsAtom,
  nebulasLayerActiveAtom,
} from "../store/nebulas.store";
import { Nebula } from "../utils/map/Nebula";

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

export const useMapContextMenu = () => {
  const showContextMenu = useContextMenu();
  const setSelectedAction = useSetAtom(selectedActionAtom);
  const dispatchNebulas = useSetAtom(nebulasAtomsAtom);
  const isNebulasLayerActive = useAtomValue(nebulasLayerActiveAtom);

  return (e: L.LeafletMouseEvent) => {
    e.originalEvent.preventDefault();
    showContextMenu([
      {
        key: "add_system",
        icon: <IconNewSection size="1rem" />,
        disabled: true,
        onClick: () => {
          console.log("TODO: Add system");
        },
      },
      { key: "divider" },
      {
        key: "add_nebula",
        icon: <IconCirclePlus size="1rem" />,
        disabled: !isNebulasLayerActive,
        onClick: () => {
          setSelectedAction("edit");
          const nebula = new Nebula({
            x: Math.round(e.latlng.lng),
            y: Math.round(e.latlng.lat),
            radius: 10,
          });
          nebula.isNew = true;
          dispatchNebulas({ type: "insert", value: nebula });
        },
      },
      // @ts-ignore
    ])(e.originalEvent);
  };
};
