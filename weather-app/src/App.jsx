import { useState, useEffect } from "react";
import { WeatherData } from "./services/weather";
import Map from "./components/map";
import Search from "./components/search";
import Favourite from "./components/favourite";
import Location from "./components/location";
import Weather from "./components/weather";
import "leaflet/dist/leaflet.css";
import "./index.css";

function App() {
  const [markedPosition, setMarkedPosition] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    if (myPosition && myPosition.length === 2) {
      setMarkedPosition({ lat: myPosition[0], lng: myPosition[1] });
    }
  }, [myPosition]);

  const addToFavourites = (locationData) => {
    setFavourites((prev) => [...prev, { ...locationData, id: Date.now() }]);
  };
  const removeFromFavourites = (id) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== id));
  };
  const updateFavourites = async () => {
    if (favourites.length === 0) {
      return;
    }
    const updatedFavourites = await Promise.all(
      favourites.map(async (fav) => {
        if (!fav.lat || !fav.lon) return fav;
        try {
          const weather = await WeatherData(fav.lat, fav.lon);
          if (weather) {
            return {
              ...fav,
              temp: weather.main.temp,
              description: weather.weather[0].description,
              icon: weather.weather[0].icon,
              timestamp: Math.floor(Date.now() / 1000),
            };
          }
          return fav;
        } catch {
          return fav;
        }
      })
    );
    setFavourites(updatedFavourites);
  };

  const addCurrentPositionToFavourites = async () => {
    let lat, lon;
    if (markedPosition?.lat && markedPosition?.lng) {
      lat = markedPosition.lat;
      lon = markedPosition.lng;
    } else if (myPosition?.length === 2) {
      [lat, lon] = myPosition;
    } else {
      return;
    }
    try {
      const weather = await WeatherData(lat, lon);
      if (!weather) return;
      addToFavourites({
        location: weather.name,
        lat,
        lon,
        temp: weather.main.temp,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
        timestamp: Math.floor(Date.now() / 1000),
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="Page">
      <div className="Main">
        <div className="TopRow">
          <div className="LeftCol">
            <div className="Map">
              <Search
                setMarkedPosition={setMarkedPosition}
                setMyPosition={setMyPosition}
                setLocationFetched={setLocationFetched}
              />
              <Map
                markedPosition={markedPosition}
                setMarkedPosition={setMarkedPosition}
                setMyPosition={setMyPosition}
                myPosition={myPosition}
              />
              <div className="MapActions">
                <button
                  type="button"
                  title="Refresh Information"
                  onClick={updateFavourites}
                >
                  🔃
                </button>
                <button
                  type="button"
                  title="Add To Favourites"
                  onClick={addCurrentPositionToFavourites}
                  aria-label="Add current location to favourites"
                >
                  ⭐
                </button>
                <button
                  type="button"
                  title="Remove Favourites"
                  onClick={() =>
                    favourites.length > 0 &&
                    removeFromFavourites(favourites[0].id)
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="Weather">
              <Weather
                variant="forecast"
                markedPosition={markedPosition}
                myPosition={myPosition}
                locationFetched={locationFetched}
              />
            </div>
          </div>
          <div className="TopRight">
            <Location
              setMyPosition={setMyPosition}
              setLocationFetched={setLocationFetched}
            />
            <Weather
              variant="info"
              markedPosition={markedPosition}
              myPosition={myPosition}
              locationFetched={locationFetched}
            />
            <hr className="DividerH" />
            <Favourite favourites={favourites} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
