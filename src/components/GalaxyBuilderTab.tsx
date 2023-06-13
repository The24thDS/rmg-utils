import {
  MapContainer,
  Popup,
  ImageOverlay,
  CircleMarker,
  Polyline,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";

import background from "../assets/images/galaxycolor.png";

import { parseData } from "../utils/galaxyBuilder";

export const GalaxyBuilderTab = () => {
  const { systems, hyperlanes } = parseData();

  console.debug(`${systems.size} systems loaded.`);
  console.debug(`${hyperlanes.length} hyperlanes loaded.`);
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
      <ImageOverlay
        url={background}
        bounds={[
          [-500, -500],
          [500, 500],
        ]}
        opacity={0.3}
      />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Systems" checked>
          <LayerGroup>
            {Array.from(systems.keys()).map((id) => {
              const system = systems.get(id);
              return system ? (
                <CircleMarker key={id} center={[system.y, system.x]} radius={3}>
                  <Popup>{system.name}</Popup>
                </CircleMarker>
              ) : null;
            })}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hyperlanes" checked>
          <LayerGroup>
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
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
