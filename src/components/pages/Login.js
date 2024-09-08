import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <h1 className="login">INICIAR SESION</h1>
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
      <div>
        <Link to="/registrarse">O registrarse</Link>
      </div>
    </>
  );
}
