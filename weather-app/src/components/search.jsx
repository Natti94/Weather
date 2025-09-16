import { useState } from "react";
import { SearchData } from "../services/search";

function Search({ setMarkedPosition }) {
  const [query, setQuery] = useState("");
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    const data = await SearchData(query);
    if (data) {
      setMarkedPosition({ lat: data.lat, lng: data.lon });
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
