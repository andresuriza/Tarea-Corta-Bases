import React, { useState } from 'react';
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [submittedData, setSubmittedData] = useState(null); // Para almacenar los datos enviados

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setSubmittedData(formData); // Guardamos los datos enviados para mostrarlos
    // Aquí puedes hacer algo más con los datos, como enviarlos a una API
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

      {/* Mostrar los valores ingresados cuando se envía el formulario */}
      {submittedData && (
        <div className="submitted-data">
          <h3>Datos enviados:</h3>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Contraseña:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}


