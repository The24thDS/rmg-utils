import { LayersControl, Pane, LayerGroup } from "react-leaflet";
import { useAtom, useSetAtom } from "jotai";

import {
  systemsAtomsAtom,
  systemsLayerActiveAtom,
} from "../../../store/systems.store";
import { SystemMarker } from "../System/SystemMarker";

export const SystemsLayer = () => {
  const [systemsAtoms, dispatch] = useAtom(systemsAtomsAtom);
  const setSystemLayerActive = useSetAtom(systemsLayerActiveAtom);
  return (
    <LayersControl.Overlay name="systems" checked>
      <LayerGroup
        eventHandlers={{
          add: () => {
            setSystemLayerActive(true);
          },
          remove: () => {
            setSystemLayerActive(false);
          },
        }}
      >
        <Pane name="systems" style={{ zIndex: 400 }}>
          {systemsAtoms.map((systemAtom) => (
            <SystemMarker
              key={`${systemAtom}`}
              systemAtom={systemAtom}
              // remove={() => dispatch({ type: "remove", atom: systemAtom })}
            />
          ))}
        </Pane>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};
