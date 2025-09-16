export function getUserLocation(setMyPosition, setLoading, setLocationFetched) {
  setLoading(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyPosition([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
        if (typeof setLocationFetched === "function") {
          setLocationFetched(true);
        } else {
          console.error(
            "setLocationFetched is not a function:",
            setLocationFetched
          );
        }
      },
      (error) => {
        alert(`Location Error: ${error.message}`);
        setLoading(false);
        if (typeof setLocationFetched === "function") {
          setLocationFetched(false);
        } else {
          console.error(
            "setLocationFetched is not a function:",
            setLocationFetched
          );
        }
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
    setLoading(false);
    if (typeof setLocationFetched === "function") {
      setLocationFetched(false);
    } else {
      console.error(
        "setLocationFetched is not a function:",
        setLocationFetched
      );
    }
  }
}
