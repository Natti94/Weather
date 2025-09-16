import { useMapEvents } from "react-leaflet";

function Click({ setMarkedPosition }) {
  useMapEvents({
    click(e) {
      setMarkedPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

export default Click;
