import React, { useState, useEffect } from "react";
import "./Starships.css";
import award from "./award.jpg";
import "./style.css";

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStarships() {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        const data = await response.json();
        setStarships(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStarships();
  }, []);

  // Step 1: Calculate the number of films each Starship has appeared in
  const filmsByStarship = {};
  starships.forEach((starship) => {
    starship.films.forEach((film) => {
      if (!filmsByStarship[starship.name]) {
        filmsByStarship[starship.name] = 0;
      }
      filmsByStarship[starship.name]++;
    });
  });

  // Step 2: Identify the Starship with the highest number of films
  const maxFilms = Math.max(...Object.values(filmsByStarship));
  const starshipWithMaxFilms = Object.keys(filmsByStarship).find(
    (name) => filmsByStarship[name] === maxFilms
  );

  // Step 3: Sort the Starships by crew size and filter out any with a crew size larger than 10
  const filteredStarships = starships
    .filter((starship) => starship.crew <= 10)
    .sort((a, b) => a.crew - b.crew);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="starships-container">
          {filteredStarships.map((starship) => (
            <Starship
              key={starship.name}
              name={starship.name}
              model={starship.model}
              crew={starship.crew}
              films={starship.films}
              image={`https://starwars-visualguide.com/assets/img/starships/${getStarshipId(starship.url)}.jpg`}
              hasMaxFilms={starship.name === starshipWithMaxFilms}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Starship({ name, model, crew, films, image, hasMaxFilms }) {
  return (
    <div className={`starship ${hasMaxFilms ? "max-films" : ""}`} >
      <img src={image} alt="Starship" />
      <div >
        <h3>{name}</h3>
        <p>Model: {model}</p>
        <p>Crew: {crew}</p>
        <p>Films: {films.length}</p>
      </div >
      <div className="app">{hasMaxFilms && <img src={award} alt="award logo" />}</div>
    </div>
  );
}

// Helper function to extract the Starship ID from the API URL
function getStarshipId(url) {
  const regex = /\/([0-9]*)\/$/;
  return url.match(regex)[1];
}

export default Starships;
