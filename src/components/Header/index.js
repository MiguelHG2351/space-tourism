import React from "react";
import "../../css/Header.css";
import ListMenu from "./ListMenu";

export default function Header() {


  return (
    <header className="header-site">
      <img src="/assets/shared/logo.svg" width={40} height={40} alt="logo de la empresa" />
      <ListMenu />
    </header>
  );
}
