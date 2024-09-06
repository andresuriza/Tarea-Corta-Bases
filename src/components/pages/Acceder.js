import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function Acceder() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <h1 className="acceder">ACCEDER</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="text" />
      </div>
      <button type="button" onClick={handleClick}>
        Registrarse
      </button>
    </>
  );
}
