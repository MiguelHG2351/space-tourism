import React from "react";

export default function ListItem({ number, title, url }) {
	const number_parse = `${number}`.padStart(2, "0");
    
  return (
    <li className="header-list-item">
      <Link to={url}>
        <span className="nav-number">{number_parse}</span>
        <span className="nav-text">{title}</span>
      </Link>
    </li>
  );
}
