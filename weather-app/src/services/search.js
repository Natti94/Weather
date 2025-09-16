export async function SearchData(query) {
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}&addressdetails=1`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch search data");
    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    return null;
  } catch (error) {
    console.error("Search API Error:", error);
    return null;
  }
}
