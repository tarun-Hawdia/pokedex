// src/pages/PokemonDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PokemonDetail.css";

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon-detail">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h1>{pokemon.name}</h1>
      <p>
        <strong>Weight:</strong> {pokemon.weight}
      </p>
      <p>
        <strong>Height:</strong> {pokemon.height}
      </p>
      <p>
        <strong>Types:</strong>{" "}
        {pokemon.types.map((type) => type.type.name).join(", ")}
      </p>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to List
      </button>
    </div>
  );
}

export default PokemonDetail;
