import { useState } from "react";
import { getUserLocation } from "../services/location.js";

function Location({ setMyPosition, setLocationFetched }) {
  const [loading, setLoading] = useState(false);
  const getLocation = () => {
    setLocationFetched(false);
    getUserLocation(setMyPosition, setLoading, setLocationFetched);
  };

  return (
    <div>
      <button
        className="location-button"
        onClick={getLocation}
        disabled={loading}
      >
        {loading ? "Fetching Location..." : "Get My Location"}
      </button>
    </div>
  );
}

export default Location;
