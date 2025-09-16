import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import Click from "./click";
import Marker from "./marker";

function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);
  return null;
}
function Map({ markedPosition, setMarkedPosition, myPosition }) {
  const center = myPosition || [51.505, -0.09];
  return (
    <MapContainer center={center} zoom={5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <MapUpdater position={myPosition || center} />
      <Click setMarkedPosition={setMarkedPosition} />
      <Marker markedPosition={markedPosition} />
    </MapContainer>
  );
}

export default Map;
