import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./Registrarse.css"; 

export default function Registrarse() {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    nutri_id: "",
    edad: "",
    fecha_nacimiento: "",
    peso: "",
    imc: "",
    direccion: "",
    credit_card: "",
    cobro: "semanal",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);  // Verifica qué datos estás enviando
    axios.post("http://127.0.0.1:5000/api/register", formData)
      .then(response => {
        console.log(response.data);
        alert("¡Registro exitoso!");
        navigate("/"); // Redirige después del registro
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un código de estado que cae fuera del rango de 2xx
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
          alert(`Error en el servidor: ${error.response.status}`);
        } else if (error.request) {
          // La solicitud se hizo pero no hubo respuesta
          console.error("Error request:", error.request);
          alert("El servidor no está respondiendo.");
        } else {
          // Algo pasó al configurar la solicitud que provocó un error
          console.error("Error en la configuración de la solicitud:", error.message);
          alert("Error al configurar la solicitud.");
        }
      });
  };
  

  return (
    <div className="register-container">
      <h1 className="registrarse">¡Únete a NutriTEC!</h1>
      <p className="description">Tu viaje hacia una mejor nutrición comienza aquí.</p>
      <form className="register-form">
        <div className="input-group">
          <label>Número de cédula</label>
          <input id="cedula" type="text" placeholder="Ingresa tu número de cédula" onChange={handleChange} value={formData.cedula} />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input id="nombre" type="text" placeholder="Ingresa tu nombre" onChange={handleChange} value={formData.nombre} />
        </div>

        <div className="input-group">
          <label>Primer apellido</label>
          <input id="apellido1" type="text" placeholder="Ingresa tu primer apellido" onChange={handleChange} value={formData.apellido1} />
        </div>

        <div className="input-group">
          <label>Segundo apellido</label>
          <input id="apellido2" type="text" placeholder="Ingresa tu segundo apellido" onChange={handleChange} value={formData.apellido2} />
        </div>

        <div className="input-group">
          <label>Código de nutricionista</label>
          <input id="nutri_id" type="text" placeholder="Ingresa tu código de nutricionista" onChange={handleChange} value={formData.nutri_id} />
        </div>

        <div className="input-group">
          <label>Edad</label>
          <input id="edad" type="text" placeholder="Ingresa tu edad" onChange={handleChange} value={formData.edad} />
        </div>

        <div className="input-group">
          <label>Fecha de nacimiento</label>
          <input type="date" id="fecha_nacimiento" name="fecha-nacimiento" onChange={handleChange} value={formData.fecha_nacimiento} />
        </div>

        <div className="input-group">
          <label>Peso</label>
          <input id="peso" type="text" placeholder="Ingresa tu peso" onChange={handleChange} value={formData.peso} />
        </div>

        <div className="input-group">
          <label>IMC</label>
          <input id="imc" type="text" placeholder="Ingresa tu IMC" onChange={handleChange} value={formData.imc} />
        </div>

        <div className="input-group">
          <label>Dirección</label>
          <input id="direccion" type="text" placeholder="Ingresa tu dirección" onChange={handleChange} value={formData.direccion} />
        </div>

        <div className="input-group">
          <label>Tarjeta de crédito</label>
          <input id="credit_card" type="text" placeholder="Ingresa tu número de tarjeta" onChange={handleChange} value={formData.credit_card} />
        </div>

        <div className="input-group">
          <label>Tipo de cobro</label>
          <select name="cobro" id="cobro" onChange={handleChange} value={formData.cobro}>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Ingresa tu correo electrónico" onChange={handleChange} value={formData.email} />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} value={formData.password} />
        </div>

        <button type="button" onClick={handleSubmit} className="btn-register">
          Registrarse
        </button>
        <p className="message">¡Estás a solo un paso de comenzar tu viaje hacia una mejor salud!</p>
      </form>
    </div>
  );
}
