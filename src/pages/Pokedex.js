import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Pokedex.css";

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [details, setDetails] = useState([]);
  const [offset, setOffset] = useState(Number(process.env.OFFSET));
  const [count, setCount] = useState(0);

  // Get limit from environment variables
  const limit = Number(process.env.LIMIT);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setCount(data.count);
        setPokemon(data.results);
      });
  }, [offset, limit]);

  useEffect(() => {
    if (pokemon.length > 0) {
      Promise.all(
        pokemon.map((p) =>
          fetch(p.url)
            .then((response) => response.json())
            .then((data) => ({
              id: data.id,
              name: data.name,
              image: data.sprites.front_default,
              weight: data.weight,
              height: data.height,
            }))
        )
      ).then((results) => setDetails(results));
    }
  }, [pokemon]);

  const handleNext = () => {
    if (offset + limit < count) {
      setOffset(offset + limit);
    }
  };

  const handlePrevious = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <div className="pokedex">
      <h1>Welcome to Pokedex</h1>
      <div className="grid">
        {details.map((p) => (
          <Link to={`/pokemon/${p.name}`} key={p.id} className="grid-item-link">
            <div className="grid-item">
              <img src={p.image} alt={p.name} />
              <div className="info">
                <strong>{p.name}</strong>
                <p>Weight: {p.weight}</p>
                <p>Height: {p.height}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={offset === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={offset + limit >= count}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pokedex;
