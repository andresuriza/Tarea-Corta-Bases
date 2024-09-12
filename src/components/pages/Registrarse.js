import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import "./Registrarse.css"; // Asegúrate de crear este archivo CSS

export default function Registrarse() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="register-container">
      <h1 className="registrarse">¡Únete a NutriTEC!</h1>
      <p className="description">Tu viaje hacia una mejor nutrición comienza aquí.</p>
      <form className="register-form">
        <div className="input-group">
          <label>Número de cédula</label>
          <input id="cedula" type="text" placeholder="Ingresa tu número de cédula" />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input id="nombre" type="text" placeholder="Ingresa tu nombre" />
        </div>

        <div className="input-group">
          <label>Primer apellido</label>
          <input id="apellido1" type="text" placeholder="Ingresa tu primer apellido" />
        </div>

        <div className="input-group">
          <label>Segundo apellido</label>
          <input id="apellido2" type="text" placeholder="Ingresa tu segundo apellido" />
        </div>

        <div className="input-group">
          <label>Código de nutricionista</label>
          <input id="nutri_id" type="text" placeholder="Ingresa tu código de nutricionista" />
        </div>

        <div className="input-group">
          <label>Edad</label>
          <input id="edad" type="text" placeholder="Ingresa tu edad" />
        </div>

        <div className="input-group">
          <label>Fecha de nacimiento</label>
          <input type="date" id="fecha-nacimiento" name="fecha-nacimiento" />
        </div>

        <div className="input-group">
          <label>Peso</label>
          <input id="peso" type="text" placeholder="Ingresa tu peso" />
        </div>

        <div className="input-group">
          <label>IMC</label>
          <input id="imc" type="text" placeholder="Ingresa tu IMC" />
        </div>

        <div className="input-group">
          <label>Dirección</label>
          <input id="direccion" type="text" placeholder="Ingresa tu dirección" />
        </div>

        <div className="input-group">
          <label>Foto</label>
          <button type="button" className="btn-photo">Seleccionar Foto</button>
        </div>

        <div className="input-group">
          <label>Tarjeta de crédito</label>
          <input id="credit-card" type="text" placeholder="Ingresa tu número de tarjeta" />
        </div>

        <div className="input-group">
          <label>Tipo de cobro</label>
          <select name="cobro" id="cobro">
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Ingresa tu correo electrónico" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" placeholder="Ingresa tu contraseña" />
        </div>

        <button type="button" onClick={handleClick} className="btn-register">
          Registrarse
        </button>
        <p className="message">¡Estás a solo un paso de comenzar tu viaje hacia una mejor salud!</p>
      </form>
    </div>
  );
}

