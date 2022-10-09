import React from "react";
import "../css/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-container">
        <div className="hero">
          <h1 className="hero-title heading-5">So, you want to travel to</h1>
          <h2 className="hero-title-2 heading-1">Space</h2>
          <p className="hero-description body-text">
            Let’s face it; if you want to go to space, you might as well genuinely
            go to outer space and not hover kind of on the edge of it. Well sit
            back, and relax because we’ll give you a truly out of this world
            experience!
          </p>
        </div>
        <div className="explore">
          <button type="button" className="btn-explore heading-4">Explore</button>
        </div>
      </div>
    </div>
  );
}
