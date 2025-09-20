import { useState } from "react";
import { SearchData } from "../services/search";

function Search({ setMarkedPosition, setMyPosition, setLocationFetched }) {
  const [query, setQuery] = useState("");
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    const data = await SearchData(query);
    if (data) {
      setMarkedPosition({ lat: data.lat, lng: data.lon });
      if (typeof setMyPosition === "function") {
        setMyPosition([data.lat, data.lon]);
      }
      if (typeof setLocationFetched === "function") {
        setLocationFetched(true);
      }
    } else {
      alert("Location not found!");
    }
  }
  return (
    <form onSubmit={handleSearch}>
      <input
        className="wf-search"
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default Search;
