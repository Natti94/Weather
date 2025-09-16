import { useState, useEffect } from "react";
import { WeatherData, ForeCastData } from "../services/weather";

function Weather({
  markedPosition,
  myPosition,
  locationFetched,
  variant = "full",
}) {
  const [weatherData, setWeatherData] = useState(null);
  const [foreCastData, setForeCastData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      setLoading(true);
      setWeatherData(null);
      setForeCastData([]);
      const weather = await WeatherData(lat, lon);
      setWeatherData(weather);
      const forecast = await ForeCastData(lat, lon);
      setForeCastData(forecast?.list || []);
      setLoading(false);
    };
    let lat, lon;
    if (markedPosition?.lat && markedPosition?.lng) {
      lat = markedPosition.lat;
      lon = markedPosition.lng;
      fetchWeather(lat, lon);
    } else if (locationFetched && myPosition?.length === 2) {
      [lat, lon] = myPosition;
      fetchWeather(lat, lon);
    }
  }, [markedPosition, myPosition, locationFetched]);
  if (loading) {
    return <div>Loading weather data...</div>;
  }
  if (!weatherData) {
    return <div>No weather data available.</div>;
  }
  const InfoBlock = (
    <div className="wf-weather-info">
      <div className="wf-weather-icons">
        <h3>{weatherData.name}</h3>
      </div>
      <h4>Temperature: </h4>
      <p>{weatherData.main.temp}°C</p>
      <h4>Weather:</h4>
      <p>{weatherData.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
  const ForecastBlock = (
    <div className="wf-forecast">
      <h4>5-Day Forecast:</h4>
      <div>
        {foreCastData.length > 0 ? (
          foreCastData
            .filter((_, index) => index % 8 === 0)
            .map((day, index) => (
              <div key={index} className="forecast-card">
                <h4>Time & Date:</h4>
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <h4>Temperature:</h4>
                <p>{day.main.temp}°C</p>
                <h4>Weather:</h4>
                <p>{day.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="forecast icon"
                />
              </div>
            ))
        ) : (
          <p>No forecast data available.</p>
        )}
      </div>
    </div>
  );

  if (variant === "info") return InfoBlock;
  if (variant === "forecast") return ForecastBlock;
  return (
    <div className="wf-weather">
      {InfoBlock}
      {ForecastBlock}
    </div>
  );
}

export default Weather;
