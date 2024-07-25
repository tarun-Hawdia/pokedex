// src/App.js
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetail";
import Header from "./pages/Header";
import MainHeader from "./pages/MainHeader/Mainheader";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route
          path="/pokedex/:username"
          element={
            <ProtectedRoute>
              <Pokedex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokemon/:name"
          element={
            <ProtectedRoute>
              <PokemonDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
