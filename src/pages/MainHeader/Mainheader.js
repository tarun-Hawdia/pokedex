import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import logo from "./download.jpg";

const MainHeader = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <img
            title="Go to home"
            alt="Go to home"
            src={logo}
            className="logo"
          />
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
