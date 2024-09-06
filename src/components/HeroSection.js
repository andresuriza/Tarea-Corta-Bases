import React from "react";
import "../App.css";
import "./HeroSection.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

// Seccion sobre imagen
function HeroSection() {
  const redirect = () => <Link to="/acceder" className="btn-mobile"></Link>;

  return (
    <div className="hero-container">
      <h1>LOGRA TUS METAS</h1>
      <p>Con NutriTEC</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          INICIEMOS
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
