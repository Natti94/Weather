# Weather App

> **Note:** This repository contains the finalized version of the project, forked from another of my repositories. As a result, there are few or no commits here aside from the initial import.

A simple weather and map application built with React + Vite, Leaflet, and the OpenWeather API. It lets you:

- Search any place (via Nominatim) and move the map to it
- Fetch your current location using the browser’s Geolocation API
- View current conditions and a compact 5-day forecast
- Save locations as favourites and refresh them later

## Features

- Interactive map powered by Leaflet (OpenStreetMap tiles)
- Bottom-left search bar over the map to jump to locations
- “Get My Location” to center and fetch weather for your position
- Current weather card and 5-day forecast cards
- Favourites panel with temperature, description, icon, and timestamp

## Tech Stack

- React + Vite
- Leaflet and react-leaflet
- OpenWeather API (current and forecast)
- Nominatim (OpenStreetMap) for geocoding

## Prerequisites

- Node.js 18+ and npm
- An OpenWeather API key

## Setup

1) Move into the app folder

```powershell
cd weather-app
```

2) Install dependencies

```powershell
npm install
```

3) Configure your environment

Create a `.env` file in `weather-app/` with your OpenWeather key:

```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

4) Start the dev server

```powershell
npm run dev
```

Open the printed local URL in your browser.

## Usage

- Use the search input on the map to jump to a city or address.
- Click “Get My Location” to center the map on you and fetch weather.
- Current conditions appear under the Location section; the forecast appears under the map.
- Use the favourites section to review saved places; refresh them when needed.

## Notes

- Be mindful of OpenWeather and Nominatim usage policies and rate limits.
- If tiles or searches fail, check your network and API key configuration.

## License

This project is provided as-is without a specified license. Add your preferred license if you plan to distribute.
