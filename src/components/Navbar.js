import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Asegúrate de que este archivo contenga los estilos adicionales

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado inicial nulo para usuario logueado
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar el menú desplegable
  const navigate = useNavigate();

  // Cargar el estado del usuario logueado desde localStorage
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user); // Si hay un usuario logueado en localStorage, actualizar el estado
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Eliminar el usuario del localStorage
    setLoggedInUser(null); // Actualizar el estado a null
    setShowMenu(false); // Cerrar el menú desplegable si está abierto
    navigate("/"); // Redirigir a la página principal
    window.location.reload(); // Refrescar la página para asegurar la actualización completa
  };

  // Función para mostrar el menú de perfil
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            NutriTEC
            <i className="fa-solid fa-utensils" />
          </Link>
          <ul className="nav-menu">
            {/* Mostrar ícono de perfil si el usuario está logueado */}
            {loggedInUser ? (
              <li className="nav-item">
                <div className="profile-icon" onClick={toggleMenu}>
                  <i className="fas fa-user-circle fa-3x"></i> {/* Ícono más grande */}
                </div>
                {showMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-user-info">
                      <p>{loggedInUser}</p>
                      <Link to="/profile">Ver todos los perfiles</Link>
                    </div>
                    <ul>
                      <li>Configuración y privacidad</li>
                      <li>Ayuda y soporte técnico</li>
                      <li>Pantalla y accesibilidad</li>
                      <li>Enviar comentarios</li>
                      <li onClick={handleLogout}>Cerrar sesión</li>
                    </ul>
                  </div>
                )}
              </li>
            ) : null}
          </ul>
          {/* Botón de "INICIA SESIÓN" cuando no está logueado */}
          {!loggedInUser && (
            <Link to="/login">
              <Button buttonStyle="btn--outline">INICIA SESIÓN</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
