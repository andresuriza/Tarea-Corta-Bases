import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function Registrarse() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <h1 className="registrarse">REGISTRARSE</h1>
      <div>
        <label>Número de cédula</label>
        <input id="cedula" type="text" />
      </div>
      <div>
        <label>Nombre</label>
        <input id="nombre" type="text" />
      </div>
      <div>
        <label>Primer apellido</label>
        <input id="apellido1" type="text" />
      </div>
      <div>
        <label>Segundo apellido</label>
        <input id="apellido2" type="text" />
      </div>
      <div>
        <label>Código de nutricionista</label>
        <input id="nutri_id" type="text" />
      </div>
      <div>
        <label>Edad</label>
        <input id="edad" type="text" />
      </div>
      <div>
        <label>Fecha de nacimiento</label>
        <input
          type="date"
          id="fecha-nacimiento"
          name="fecha-nacimiento"
        ></input>
      </div>
      <div>
        <label>Peso</label>
        <input id="peso" type="text" />
      </div>
      <div>
        <label>IMC</label>
        <input id="imc" type="text" />
      </div>
      <div>
        <label>Dirección</label>
        <input id="direccion" type="text" />
      </div>
      <div>
        <label>Foto</label>
        <button type="button">Seleccionar</button>{" "}
        {/* Pendiente hacer que funcione boton */}
      </div>
      <div>
        <label>Tarjeta de crédito</label>
        <input id="credit-card" type="text" />
      </div>
      <div>
        <label>Tipo de cobro</label>
        <select name="cobro" id="cobro">
          <option value="semanal">Semanal</option>
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="text" />
      </div>
      <div>
        <button type="button" onClick={handleClick}>
          Registrarse
        </button>
      </div>
    </>
  );
}
