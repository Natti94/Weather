import { Marker as LeafletMarker, Popup } from "react-leaflet";

function Marker({ markedPosition }) {
  if (!markedPosition || !markedPosition.lat || !markedPosition.lng)
    return null;

  return (
    <LeafletMarker position={[markedPosition.lat, markedPosition.lng]}>
      <Popup className="wf-map-popup">
        <p>Marked Location</p>
      </Popup>
    </LeafletMarker>
  );
}

export default Marker;
