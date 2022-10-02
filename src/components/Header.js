import React from "react";
import "../css/Header.css";

export default function Header() {
  return (
    <header className="header-site">
      <img src="/assets/shared/logo.svg" alt="logo de la empresa" />
      <button className="btn-menu" aria-label="menu" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
          <g fill="#D0D6F9" fillRule="evenodd">
            <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
          </g>
        </svg>
      </button>
      <nav className="header-menu">
        <ul className="header-list-menu">
          <li className="header-list-item">
            <span className="nav-number">01</span>
            <span className="nav-text">Home</span>
          </li>
          <li className="header-list-item">
            <span className="nav-number">02</span>
            <span className="nav-text">Destination</span>
          </li>
          <li className="header-list-item">
            <span className="nav-number">03</span>
            <span className="nav-text">Crew</span>
          </li>
          <li className="header-list-item">
            <span className="nav-number">04</span>
            <span className="nav-text">Technology</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
