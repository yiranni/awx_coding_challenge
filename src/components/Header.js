import React from "react";
import logo from "../images/logo.png";
import "./Header.css";
// import PropTypes from 'prop-types';

export default function Header() {
  return (
    <header className="app-header">
      <div fixed="top" className="nav">
        <p>
          <img className="logo mr-2" src={logo} alt="logo" />
          <span style={{ color: "#70A618" }}>Brocolli</span>
          <span style={{ color: "#3D4056" }}> & Co.</span>
        </p>
      </div>
    </header>
  );
}

Header.propTypes = {};
Header.defaultProps = {};
