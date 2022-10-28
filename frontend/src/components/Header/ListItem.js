// import { Link } from "react-router-dom";
import React from "react";

export default function ListItem({ number, title, url, isSelected }) {
  
  return (
    <li className="header-list-item">
      <a href={url} {...{}} className={isSelected ? 'active': ''}>
        <span className="nav-number nav-text">{number}</span>
        <span className="nav-text">{title}</span>
      </a>
    </li>
  );
}
