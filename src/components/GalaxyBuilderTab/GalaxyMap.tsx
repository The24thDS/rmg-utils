import {
  MapContainer,
  ImageOverlay,
  Polyline,
  LayersControl,
  LayerGroup,
  Pane,
} from "react-leaflet";
import L from "leaflet";
import { useAtom, useSetAtom } from "jotai";
import { ContextMenuProvider } from "mantine-contextmenu";

import { System } from "../../utils/map/System";
import { Hyperlane } from "../../utils/map/Hyperlane";
import {
  nebulasLayerActiveAtom,
  nebulasAtomsAtom,
} from "../../store/nebulas.store";
import { NebulaMarker } from "./Nebula/NebulaMarker";
import { useMapContextMenu } from "../../hooks";
import { SystemsLayer } from "./System/SystemsLayer";

// TODO: Find a better picture
import background from "../../assets/images/galaxycolor.png";

import "./GalaxyMap.css";

const NebulasLayer = () => {
  const [nebulasAtoms, dispatch] = useAtom(nebulasAtomsAtom);
  const setNebulasLayerActive = useSetAtom(nebulasLayerActiveAtom);
  return (
    <LayersControl.Overlay name="Nebulas" checked>
      <LayerGroup
        eventHandlers={{
          add: () => {
            setNebulasLayerActive(true);
          },
          remove: () => {
            setNebulasLayerActive(false);
          },
        }}
      >
        <Pane name="nebulas" style={{ zIndex: 200 }}>
          {nebulasAtoms.map((nebulaAtom) => (
            <NebulaMarker
              key={`${nebulaAtom}`}
              nebulaAtom={nebulaAtom}
              remove={() => dispatch({ type: "remove", atom: nebulaAtom })}
            />
          ))}
        </Pane>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

const BackgroundPane = () => {
  const contextmenu = useMapContextMenu();
  return (
    <Pane name="background" style={{ zIndex: 100 }}>
      <ImageOverlay
        url={background}
        bounds={[
          [-500, -500],
          [500, 500],
        ]}
        opacity={0.3}
        interactive
        className="galaxy-map-background"
        eventHandlers={{
          contextmenu,
        }}
      />
    </Pane>
  );
};

export const GalaxyMap = () => {
  const systems = new Map<number, System>();
  const hyperlanes: Hyperlane[] = [];

  return (
    <ContextMenuProvider>
      <MapContainer
        center={[0, 0]}
        zoom={-0.6}
        zoomSnap={0.1}
        zoomDelta={0.1}
        maxZoom={10}
        minZoom={-1.7}
        style={{
          width: "70vh",
          height: "70vh",
          backgroundColor: "black",
          border: "2px solid white",
          margin: "0 auto",
        }}
        crs={L.CRS.Simple}
      >
        <BackgroundPane />
        <Pane name="popups" style={{ zIndex: 500 }} />
        <LayersControl position="topright">
          <SystemsLayer />
          <LayersControl.Overlay name="Hyperlanes" checked>
            <LayerGroup>
              <Pane name="hyperlanes" style={{ zIndex: 300 }}>
                {hyperlanes.map((hyperlane) => {
                  const source = systems.get(hyperlane.from);
                  const target = systems.get(hyperlane.to);
                  return source && target ? (
                    <Polyline
                      key={hyperlane.id}
                      positions={[
                        [source.y, source.x],
                        [target.y, target.x],
                      ]}
                      color="white"
                      weight={1}
                    />
                  ) : null;
                })}
              </Pane>
            </LayerGroup>
          </LayersControl.Overlay>
          <NebulasLayer />
        </LayersControl>
      </MapContainer>
    </ContextMenuProvider>
  );
};
