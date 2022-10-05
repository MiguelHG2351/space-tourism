import React from "react";
import "../../css/Header.css";
import HeaderNav from "./HeaderNav";

export default function Header() {


  return (
    <header className="header-site">
      <div className="header-logo">
        <img src="/assets/shared/logo.svg" width={40} height={40} alt="logo de la empresa" />
      </div>
      <HeaderNav />
    </header>
  );
}
