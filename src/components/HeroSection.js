import React from "react";
import "../App.css";
import "./HeroSection.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

// Importa las imágenes locales
import healthyFoodImage1 from "../images/avena.png";
import healthyFoodImage2 from "../images/berries.png";

function HeroSection() {
  return (
    <div className="hero-container">
      {/* Bienvenida */}
      <div className="welcome-message">
        <h2>¡Bienvenido a NutriTEC!</h2>
        <p>La plataforma que te ayudará a alcanzar tus metas de salud y bienestar.</p>
      </div>

      {/* Texto principal del Hero */}
      <div className="hero-text">
        <h1>Una buena salud empieza por una buena alimentación.</h1>
        <p>
          ¿Quieres prestar más atención a tu alimentación? Controla tus comidas, conoce tus hábitos y alcanza tus objetivos con NutriTEC.
        </p>
        <div className="hero-btns">
          <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large">
            EMPIEZA GRATIS
          </Button>
        </div>
      </div>

      {/* Imágenes de apoyo */}
      <div className="hero-images">
        {/* Reemplaza las imágenes remotas por las locales */}
        <img src={healthyFoodImage1} alt="Comida saludable" className="hero-image" />
        <img src={healthyFoodImage2} alt="Alimentos saludables" className="hero-image" />
      </div>
    </div>
  );
}

export default HeroSection;
