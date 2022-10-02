import { useLocation } from 'react-router-dom'
import { useState } from "react";
import React from "react";

const classOption = {
  active: "header-menu active",
  inactive: "header-menu inactive",
};

const routeBreadcrumb = {
    "/": "Inicio",
    "/about": "Nosotros",
    "/contact": "Contacto",
}

export default function ListMenu() {
    const location = useLocation();
    console.log(location.pathname)
  const [menu, setMenu] = useState("header-menu");

  function mobileHandler() {
    const classList = menu.split(" ");
    const newClass =
      classList[1] === "active" ? classOption.inactive : classOption.active;

    setMenu(newClass);
  }

  return (
    <>
      <button onClick={mobileHandler} className="btn-menu" aria-label="menu" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
          <g fill="#D0D6F9" fillRule="evenodd">
            <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
          </g>
        </svg>
      </button>
      <div className={menu}>
        <div className="header-menu-action" align="right">
          <button
            onClick={mobileHandler}
            className="btn-close"
            aria-label="menu"
            type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21">
              <g fill="#D0D6F9" fillRule="evenodd">
                <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
                <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
              </g>
            </svg>
          </button>
        </div>
        <nav className="header-list-container">
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
      </div>
    </>
  );
}
