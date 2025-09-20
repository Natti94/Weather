# Weather App

> Note: This repository contains the finalized version of the project, forked from another of my repositories. Therefore you will see few commits aside from the initial import.

A simple weather and map application with search and favourites. Built with React + Vite, Leaflet, and OpenWeather. Search any place, get your location, view current conditions and a compact 5‑day forecast, and save favourite spots.

## Features

- Search any place (Nominatim) — centers map and drops a marker
- Get My Location — centers map, drops a marker using the browser Geolocation API
- Current weather card and compact 5‑day forecast
- Save favourite locations and refresh their data later
- Interactive map (Leaflet + OpenStreetMap tiles)
- Modern, responsive styling using CSS clamp() and scoped selectors

## Project structure

```
weather-app/
	public/
		_redirects
		favicon.ico
	src/
		App.jsx              # App shell: map, location info, favourites, forecast
		index.css            # Global styles
		main.jsx             # React + Vite entry
		components/
			click.jsx          # Map click handler
			favourite.jsx      # Favourites list (compact under Location)
			location.jsx       # Get My Location button
			map.jsx            # Map view (Leaflet)
			marker.jsx         # Map marker
			search.jsx         # Search bar (Nominatim)
			weather.jsx        # Current + forecast views
		services/
			location.js        # Geolocation helpers
			search.js          # Nominatim search API
			weather.js         # OpenWeather API
	index.html
	vite.config.js
	package.json
	eslint.config.js
```

## Getting started

Run these inside `weather-app/`:

```powershell
npm install
npm run dev
```

Open the printed local URL in your browser.

### Build & preview

```powershell
npm run build
npm run preview
```

- Build output goes to `dist/`.
- Files in `public/` (including `_redirects`) are copied to `dist/` by Vite.

## Environment variables

Create `weather-app/.env` with your OpenWeather API key:

```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

## Deploying (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Ensure `public/_redirects` exists (it is copied to `dist/_redirects`).

## Editing APIs / adding providers

- OpenWeather calls live in `src/services/weather.js`.
- Search/geocoding lives in `src/services/search.js` and `src/services/location.js`.
- To change providers, swap implementations while preserving the exported functions; or add new service files and wire them where used.

## Notes & troubleshooting

- Be mindful of OpenWeather and Nominatim rate limits and usage policies.
- If tiles or searches fail, check your network and API key configuration.
- Styles are scoped to this app to avoid leaking to other pages.

## License

MIT
