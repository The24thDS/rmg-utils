import { RefObject, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

// TODO: change template to something more generic
export const useMapDragging = <T extends L.Circle>(
  onMove: (lat: number, lng: number) => void
): RefObject<T> => {
  const ref = useRef<T>(null);
  const map = useMap();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.on("mousedown", () => {
      if (!ref.current) return;
      ref.current.on("mousemove", (e) => {
        if (!ref.current) return;
        ref.current.unbindPopup();
        map.dragging.disable();
        const { lat, lng } = e.latlng;
        const roundedLat = Math.round(lat);
        const roundedLng = Math.round(lng);
        ref.current.setLatLng([roundedLat, roundedLng]);
        onMove(roundedLat, roundedLng);
      });
    });
    ref.current.on("mouseup", () => {
      map.dragging.enable();
      if (!ref.current) return;
      ref.current.off("mousemove");
    });
  }, [map.dragging, onMove]);

  return ref;
};
