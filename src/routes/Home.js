import React from "react";
import "../css/home.css";

export default function Home() {
  return (
    <div className="App">
      <div className="hero">
        <h1 className="hero-title nav-text">So, you want to travel to</h1>
        <h2 className="heading-1 hero-title-2">Space</h2>
        <p className="hero-description ">
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </p>
      </div>
      <div className="explore">
        <button type="button" className="btn-explore">Explore</button>
      </div>
    </div>
  );
}
