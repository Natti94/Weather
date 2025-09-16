# Weather App

> **Note:** This repository contains the finalized version of the project, forked from another of my repositories. As a result, there are few or no commits here aside from the initial import.

A simple weather and map application with search and favourites. Built with React + Vite, Leaflet, and the OpenWeather API. Search any place, get your location, see current conditions and a compact 5‑day forecast, and save favourite spots.

## Features

- Search any place (via Nominatim) and move the map
- Fetch your current location using the browser’s Geolocation API
- View current weather and a compact 5-day forecast
- Save locations as favourites and refresh them later
- Interactive map powered by Leaflet (OpenStreetMap tiles)
- Mobile-friendly, responsive styles using CSS `clamp()` and scoped selectors
- Clean separation of concerns: map, weather, search, and favourites

## Project Structure

```
weather-app/
	public/
		_redirects           # SPA fallback (/* -> /index.html)
		favicon.ico
	src/
	App.jsx              # App shell: header, map, weather, favourites
	index.css            # Global styles (scoped map + panels)
		main.jsx             # Entry point (React + Vite)
		components/
			click.jsx          # Map click handler
			favourite.jsx      # Favourites panel
			location.jsx       # Location/weather card
			map.jsx            # Map view (Leaflet)
			marker.jsx         # Map marker
			search.jsx         # Search bar (Nominatim)
			weather.jsx        # Weather/forecast display
		services/
			location.js        # Geolocation and reverse geocoding
			search.js          # Nominatim search API
			weather.js         # OpenWeather API
	index.html             # Vite HTML
	vite.config.js         # Vite config
	package.json           # Scripts and dependencies
	eslint.config.js       # ESLint config
	README.md              # Project documentation
```

## Getting Started

From this folder (`weather-app/`):

```powershell
npm install
npm run dev
```

Then open the printed local URL in your browser.

### Build & Preview

```powershell
npm run build
npm run preview
```

- Output goes to `dist/`.
- Files in `public/` (including `_redirects`) are copied to `dist/` automatically by Vite.

## Environment Variables

Create a `.env` file in `weather-app/` with your OpenWeather API key:

```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

## Deploying to Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Ensure `_redirects` exists in `public/` (it will be copied to `dist/_redirects`).

## Editing APIs / Adding Providers

OpenWeather current and forecast calls are encapsulated in `src/services/weather.js`. Geocoding and search are in `src/services/location.js` and `src/services/search.js`.

- To change providers, swap implementations in these files while preserving exported function names.
- If adding a new provider, add a new service file and wire it where consumed in components.

## Notes & Troubleshooting

- Be mindful of OpenWeather and Nominatim usage policies and rate limits.
- If tiles or searches fail, check your network and API key configuration.
- Styles are intentionally scoped to avoid leaking into other pages.

## Getting Started

From this folder (`weather-app/`):

```powershell
npm install
npm run dev
```

Then open the printed local URL in your browser.

### Build & Preview

```powershell
npm run build
npm run preview
```

- Output goes to `dist/`.
- Files in `public/` (including `_redirects`) are copied to `dist/` automatically by Vite.

## Environment Variables

Create a `.env` file in `weather-app/` with your OpenWeather API key:

```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

## Deploying

- Build command: `npm run build`
- Publish directory: `dist`
- Ensure `_redirects` exists in `public/` (it will be copied to `dist/_redirects`).

## Notes & Troubleshooting

- Be mindful of OpenWeather and Nominatim usage policies and rate limits.
- If tiles or searches fail, check your network and API key configuration.
- Styles are intentionally scoped to avoid leaking into other pages.

## License

MIT
