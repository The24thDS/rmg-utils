import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
import L from "leaflet";

import background from "../assets/images/galaxycolor.png";
import blackHole from "../assets/images/black_hole.png";

export const GalaxyBuilderTab = () => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={-1.6}
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
          [-1024, -1024],
          [1024, 1024],
        ]}
        opacity={0.3}
      />
      <Marker
        position={[0, 0]}
        icon={L.icon({
          iconUrl: blackHole,
          iconSize: [30, 30],
        })}
      >
        <Popup>Galactic Center</Popup>
      </Marker>
    </MapContainer>
  );
};
