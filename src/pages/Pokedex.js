// src/pages/Pokedex.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Pokedex.css";

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [details, setDetails] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setCount(data.count);
        setPokemon(data.results);
      });
  }, [offset]);

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
    if (offset + 25 < count) {
      setOffset(offset + 25);
    }
  };

  const handlePrevious = () => {
    if (offset - 25 >= 0) {
      setOffset(offset - 25);
    }
  };

  return (
    <div className="pokedex">
      <div className="grid">
        {details.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id} className="grid-item-link">
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
        <button onClick={handleNext} disabled={offset + 25 >= count}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pokedex;
