export function getUserLocation(setMyPosition, setLoading, setLocationFetched) {
  console.log("getUserLocation - Arguments:", { setMyPosition, setLoading, setLocationFetched });
  console.log("Attempting to fetch user location...");
  setLoading(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Geolocation success:", position.coords);
        setMyPosition([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
        if (typeof setLocationFetched === "function") {
          setLocationFetched(true);
        } else {
          console.error("setLocationFetched is not a function:", setLocationFetched);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        alert(`Location Error: ${error.message}`);
        setLoading(false);
        if (typeof setLocationFetched === "function") {
          setLocationFetched(false);
        } else {
          console.error("setLocationFetched is not a function:", setLocationFetched);
        }
      }
    );
  } else {
    console.error("Geolocation not supported by this browser.");
    alert("Geolocation is not supported by this browser.");
    setLoading(false);
    if (typeof setLocationFetched === "function") {
      setLocationFetched(false);
    } else {
      console.error("setLocationFetched is not a function:", setLocationFetched);
    }
  }
}