import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);  // Estado para manejar los errores de login

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Enviar los datos a la API Flask
    axios.post("http://127.0.0.1:5000/api/login", formData)
      .then(response => {
        if (response.data.message) {
          alert("¡Inicio de sesión exitoso!");
          navigate("/"); // Redirigir a otra página después del login
        }
      })
      .catch(error => {
        if (error.response && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Hubo un error al iniciar sesión.");
        }
      });
  };

  return (
    <div className="iniciar-sesion">
      <h1 className="login">INICIAR SESIÓN</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Introduce tu email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container">
          <button type="submit">
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div className="register-link">
        <Link to="/registrarse">O registrarse</Link>
      </div>

      {/* Mostrar errores de login */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
