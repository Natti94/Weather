import { Marker, Popup } from "react-leaflet";

function Mark({ markedPosition }) {
  if (!markedPosition || !markedPosition.lat || !markedPosition.lng) return null;
  return (
    <Marker position={[markedPosition.lat, markedPosition.lng]}>
      <Popup>
        <p>Marked Location</p>
      </Popup>
    </Marker>
  );
}

export default Mark;
