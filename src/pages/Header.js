// src/pages/Header.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to the login page
  };

  return (
    <header className="header">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
