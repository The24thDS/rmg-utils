import { MapContainer, Popup, ImageOverlay, CircleMarker } from "react-leaflet";
import L from "leaflet";

import background from "../assets/images/galaxycolor.png";

import { parseData } from "../utils/galaxyBuilder";

export const GalaxyBuilderTab = () => {
  const systems = parseData();

  console.log(`${systems.size} systems loaded.`);
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
      {Array.from(systems.keys()).map((id) => {
        const system = systems.get(id);
        return system ? (
          <CircleMarker key={id} center={[system.y, system.x]} radius={3}>
            <Popup>{system.name}</Popup>
          </CircleMarker>
        ) : null;
      })}
    </MapContainer>
  );
};
