function Favourite({ favourites = [] }) {
  return (
    <div>
      <h3>⭐ Favourite Locations</h3>
      {favourites.length === 0 ? (
        <p>you have no favourites..</p>
      ) : (
        <ul>
          {favourites.map((fav) => (
            <li key={fav.id}>
              <h3>{fav.location}</h3>
              <h4>Temperature:</h4>
              <p>{fav.temp}°C</p>
              <h4>Weather:</h4>
              <p>{fav.description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${fav.icon}@2x.png`}
                alt={fav.description}
              />
              <h4>Time & Date:</h4>
              <p>{new Date(fav.timestamp * 1000).toLocaleTimeString()}</p>
              <p>{new Date(fav.timestamp * 1000).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favourite;
