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
    </header>
  );
}
