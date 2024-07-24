// src/App.js
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetail";
import Header from "./pages/Header";
import MainHeader from "./pages/MainHeader/Mainheader";

function App() {
  const location = useLocation();

  // Determine if the current route is the login/signup page
  const showHeader = !["/", "/auth"].includes(location.pathname);

  return (
    <div>
      <MainHeader />
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
