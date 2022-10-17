import "../../css/Header.css";
import React from "react";
import HeaderNav from "./HeaderNav";

export default function Header() {


  return (
    <header className="header-site">
      <div className="header-logo">
        <img src="/public/assets/shared/logo.svg" width={40} height={40} alt="logo de la empresa" />
        <div className="line" aria-hidden={true}></div>
      </div>
      <HeaderNav />
    </header>
  );
}
