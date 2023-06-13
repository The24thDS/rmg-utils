import {
  MapContainer,
  Popup,
  ImageOverlay,
  CircleMarker,
  Polyline,
  LayersControl,
  LayerGroup,
  Circle,
  Pane,
} from "react-leaflet";
import L from "leaflet";

import background from "../assets/images/galaxycolor.png";

import { parseData } from "../utils/galaxyBuilder";

export const GalaxyBuilderTab = () => {
  const { systems, hyperlanes, nebulas } = parseData();

  console.debug(`${systems.size} systems loaded.`);
  console.debug(`${hyperlanes.length} hyperlanes loaded.`);
  console.debug(`${nebulas.size} nebulas loaded.`);
  return (
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
      <Pane name="background" style={{ zIndex: 100 }}>
        <ImageOverlay
          url={background}
          bounds={[
            [-500, -500],
            [500, 500],
          ]}
          opacity={0.3}
        />
      </Pane>
      <Pane name="popups" style={{ zIndex: 500 }} />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Systems" checked>
          <LayerGroup>
            <Pane name="systems" style={{ zIndex: 400 }}>
              {Array.from(systems.keys()).map((id) => {
                const system = systems.get(id);
                return system ? (
                  <CircleMarker
                    key={id}
                    center={[system.y, system.x]}
                    radius={3}
                  >
                    <Popup pane="popups">{system.name}</Popup>
                  </CircleMarker>
                ) : null;
              })}
            </Pane>
          </LayerGroup>
        </LayersControl.Overlay>
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
        <LayersControl.Overlay name="Nebulas" checked>
          <LayerGroup>
            <Pane name="nebulas" style={{ zIndex: 200 }}>
              {Array.from(nebulas.keys()).map((id) => {
                const nebula = nebulas.get(id);
                return nebula ? (
                  <Circle
                    key={id}
                    center={[nebula.y, nebula.x]}
                    radius={nebula.radius}
                    fillOpacity={0.5}
                    fillColor="purple"
                    pathOptions={{ color: "purple" }}
                  >
                    <Popup pane="popups">{nebula.name}</Popup>
                  </Circle>
                ) : null;
              })}
            </Pane>
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
