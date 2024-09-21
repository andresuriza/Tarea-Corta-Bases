import React, { useEffect, useState } from "react";
import "../App.css";
import "./HeroSection.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

// Importa las imágenes locales
import healthyFoodImage1 from "../images/avena.png";
import healthyFoodImage2 from "../images/berries.png";

function HeroSection() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  // Revisar si el usuario está logueado y su rol
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const role = localStorage.getItem("userRole");

    if (user && role) {
      setLoggedInUser(user); // Si el usuario está logueado, actualiza el estado
      setUserRole(role);     // Establece el rol del usuario
    } else {
      navigate("/"); // Redirigir al login si no está logueado
    }
  }, [navigate]);

  const handleAdminClick = () => {
    if (userRole === "administrador") {
      // Asegúrate de que se redirige correctamente al ReporteCobro
      navigate("/ReporteCobro");}
      
    else if (userRole === "nutricionista") {
      // Asegúrate de que se redirige correctamente al ReporteCobro
      navigate("/GestionNutricionista");
    } else {
      // Si el rol no es administrador, podrías manejar un error o redirigir a otra página
      console.error("No tienes permisos para acceder a esta página");
    }
  };

  const renderContentBasedOnRole = () => {
    if (userRole === "administrador") {
      return (
        <>
          <h2>¡Hola de vuelta, {loggedInUser}!</h2>
          <p>Bienvenido al panel de administración. Aquí puedes gestionar usuarios, nutricionistas y más.</p>
          <Button 
            className="btns" 
            buttonStyle="btn--primary" 
            buttonSize="btn--large"
            onClick={handleAdminClick} // Agrega la función de redirección aquí
          >
            Administrar Plataforma
          </Button>
        </>
      );
    } else if (userRole === "nutricionista") {
      return (
        <>
          <h2>¡Hola de vuelta, {loggedInUser}!</h2>
          <p>Bienvenido a tu panel de nutricionista. Administra los planes de nutrición de tus clientes.</p>
          <Button 
            className="btns" 
            buttonStyle="btn--primary" 
            buttonSize="btn--large"
            onClick={handleAdminClick} // Agrega la función de redirección aquí
          >
            Gestionar Planes Nutricionales
          </Button>
        </>
      );
    } else {
      return (
        <>
          <h2>¡Hola de vuelta, {loggedInUser}!</h2>
          <p>Estamos ansiosos por ayudarte a alcanzar tus metas de salud y bienestar.</p>
          <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large">
            Explorar Planes
          </Button>
        </>
      );
    }
  };

  return (
    <div className="hero-container">
      {/* Bienvenida personalizada si el usuario está logueado */}
      <div className="welcome-message">
        {loggedInUser ? (
          renderContentBasedOnRole()
        ) : (
          <>
            <h2>¡Bienvenido a NutriTEC!</h2>
            <p>La plataforma que te ayudará a alcanzar tus metas de salud y bienestar.</p>
            <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large">
              EMPIEZA GRATIS
            </Button>
          </>
        )}
      </div>

      {/* Texto principal del Hero */}
      <div className="hero-text">
        <h1>Una buena salud empieza por una buena alimentación.</h1>
        <p>
          ¿Quieres prestar más atención a tu alimentación? Controla tus comidas, conoce tus hábitos y alcanza tus objetivos con NutriTEC.
        </p>
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
