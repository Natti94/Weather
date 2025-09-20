function Favourite({ favourites = [], compact = false }) {
  return (
    <div className={`wf-favourites${compact ? " compact" : ""}`}>
      <h3> Favourite Locations ⭐</h3>
      {favourites.length === 0 ? (
        <p>you have no favourites..</p>
      ) : (
        <ul>
          {favourites.map((fav) => (
            <li key={fav.id}>
              {compact ? (
                <>
                  <h3 className="fav-name">{fav.location}</h3>
                  <div className="fav-row">
                    <strong className="fav-temp">{fav.temp}°C</strong>
                    <span className="fav-desc">{fav.description}</span>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${fav.icon}@2x.png`}
                    alt={fav.description}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favourite;
