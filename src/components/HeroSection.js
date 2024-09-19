import React, { useEffect, useState } from "react";
import "../App.css";
import "./HeroSection.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

// Importa las imágenes locales
import healthyFoodImage1 from "../images/avena.png";
import healthyFoodImage2 from "../images/berries.png";

function HeroSection() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Revisar si el usuario está logueado
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user); // Si el usuario está logueado, actualiza el estado
    }
  }, []);

  return (
    <div className="hero-container">
      {/* Bienvenida personalizada si el usuario está logueado */}
      <div className="welcome-message">
        {loggedInUser ? (
          <>
            <h2>¡Hola de vuelta, {loggedInUser}!</h2>
            <p>Estamos ansiosos por ayudarte a alcanzar tus metas de salud y bienestar.</p>
          </>
        ) : (
          <>
            <h2>¡Bienvenido a NutriTEC!</h2>
            <p>La plataforma que te ayudará a alcanzar tus metas de salud y bienestar.</p>
          </>
        )}
      </div>

      {/* Texto principal del Hero */}
      <div className="hero-text">
        <h1>Una buena salud empieza por una buena alimentación.</h1>
        <p>
          ¿Quieres prestar más atención a tu alimentación? Controla tus comidas, conoce tus hábitos y alcanza tus objetivos con NutriTEC.
        </p>
        <div className="hero-btns">
          {loggedInUser ? (
            <p>¡Estamos felices de tenerte de vuelta!</p>
          ) : (
            <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large">
              EMPIEZA GRATIS
            </Button>
          )}
        </div>
      </div>

      {/* Imágenes de apoyo */}
      <div className="hero-images">
        <img src={healthyFoodImage1} alt="Comida saludable" className="hero-image" />
        <img src={healthyFoodImage2} alt="Alimentos saludables" className="hero-image" />
      </div>
    </div>
  );
}

export default HeroSection;
