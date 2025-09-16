import { useState } from "react";
import Map from "./components/map";
import Search from "./components/search";
import Favourite from "./components/favourite";
import Location from "./components/location";
import Weather from "./components/weather";
import { WeatherData } from "./services/weather";
import "leaflet/dist/leaflet.css";
import "./index.css";

function App() {
  const [markedPosition, setMarkedPosition] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [locationFetched, setLocationFetched] = useState(false);

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
        <div className="ControlsAndMap">
          <div className="Controls">
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
            <div className="FavouriteMobile">
              <Favourite favourites={favourites} />
            </div>
          </div>
          <div className="RightPane">
            <div className="Map">
              <Search setMarkedPosition={setMarkedPosition} />
              <Map
                markedPosition={markedPosition}
                setMarkedPosition={setMarkedPosition}
                setMyPosition={setMyPosition}
                myPosition={myPosition}
              />
              <div className="MapActions">
                <button
                  type="button"
                  title="Remove first favourite"
                  onClick={() =>
                    favourites.length > 0 &&
                    removeFromFavourites(favourites[0].id)
                  }
                >
                  🗑️
                </button>
                <button
                  type="button"
                  title="Refresh favourites"
                  onClick={updateFavourites}
                >
                  🔃
                </button>
                <button
                  type="button"
                  title="Add to favourites"
                  onClick={addCurrentPositionToFavourites}
                  aria-label="Add current location to favourites"
                >
                  ⭐
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
        </div>
      </div>
      <aside className="Sidebar">
        <div className="Favourite">
          <Favourite favourites={favourites} />
        </div>
      </aside>
    </div>
  );
}

export default App;
