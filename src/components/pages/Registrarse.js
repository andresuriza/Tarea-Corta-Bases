import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./Registrarse.css"; 
import MD5 from "crypto-js/md5";  // Importamos la librería para encriptar

export default function Registrarse() {
  const [role, setRole] = useState("cliente");  // Estado para el rol seleccionado
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
    password: "",
    usuario_admin: "",
    pais_reside: "",
    peso_actual: "",
    cintura: "",
    cuello: "",
    caderas: "",
    porcentaje_musculo: "",
    porcentaje_grasa: "",
    consumo_calorias: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);  // Actualiza el rol seleccionado
  };

  const handleSubmit = () => {
    const encryptedPassword = MD5(formData.password).toString();

    const commonData = {
        email: formData.email,
        password: encryptedPassword,
        rol: role,
    };

    let specificData = {};
    if (role === "nutricionista") {
        specificData = {
            cedula: formData.cedula,
            nombre: formData.nombre,
            apellido1: formData.apellido1,
            apellido2: formData.apellido2,
            codigo_nutricionista: formData.nutri_id,
            edad: formData.edad,
            fecha_nacimiento: formData.fecha_nacimiento,
            peso: formData.peso,
            imc: formData.imc,
            direccion: formData.direccion,
            credit_card: formData.credit_card,
            cobro: formData.cobro,
        };
    } else if (role === "cliente") {
        specificData = {
            nombre: formData.nombre,
            apellido1: formData.apellido1,
            apellido2: formData.apellido2,
            edad: formData.edad,
            fecha_nacimiento: formData.fecha_nacimiento,
            peso: formData.peso,
            imc: formData.imc,
            pais_residencia: formData.pais_reside,
            peso_actual: formData.peso_actual,
            medida_cintura: formData.cintura,
            medida_cuello: formData.cuello,
            medida_caderas: formData.caderas,
            porcentaje_musculo: formData.porcentaje_musculo,
            porcentaje_grasa: formData.porcentaje_grasa,
            calorias_diarias_maximas: formData.consumo_calorias,
        };
    } else if (role === "administrador") {
        specificData = { nombre_usuario: formData.usuario_admin };
    }

    const dataToSubmit = { ...commonData, ...specificData };

    axios.post("http://127.0.0.1:5000/api/register", dataToSubmit)
      .then(response => {
        alert("¡Registro exitoso!");
        navigate(role === "nutricionista" ? "/GestionNutricionista" : "/");
      })
      .catch(error => {
        alert(`Error en el servidor: ${error.response.status}`);
      });
};


  return (
    <div className="register-container">
      <h1 className="registrarse">¡Únete a NutriTEC!</h1>
      <p className="description">Tu viaje hacia una mejor nutrición comienza aquí.</p>
      
      {/* Selector de roles */}
      <div className="input-group">
        <label>Selecciona tu rol</label>
        <select id="role" onChange={handleRoleChange} value={role}>
          <option value="cliente">Cliente</option>
          <option value="nutricionista">Nutricionista</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>

      <form className="register-form">
        {/* Campos comunes a todos los roles */}
        <div className="input-group">
          <label>Email</label>
          <input id="email" type="email" placeholder="Ingresa tu correo electrónico" onChange={handleChange} value={formData.email} />
        </div>
        <div className="input-group">
          <label>Contraseña</label>
          <input id="password" type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} value={formData.password} />
        </div>

        {/* Campos específicos por rol */}
        {role === "cliente" && (
          <>
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
              <label>Edad</label>
              <input id="edad" type="text" placeholder="Ingresa tu edad" onChange={handleChange} value={formData.edad} />
            </div>
            <div className="input-group">
              <label>Fecha de nacimiento</label>
              <input type="date" id="fecha_nacimiento" name="fecha-nacimiento" onChange={handleChange} value={formData.fecha_nacimiento} />
            </div>
            <div className="input-group">
              <label>Peso actual</label>
              <input id="peso_actual" type="text" placeholder="Ingresa tu peso actual" onChange={handleChange} value={formData.peso_actual} />
            </div>
            <div className="input-group">
              <label>IMC</label>
              <input id="imc" type="text" placeholder="Ingresa tu IMC" onChange={handleChange} value={formData.imc} />
            </div>
            <div className="input-group">
              <label>País de residencia</label>
              <input id="pais_reside" type="text" placeholder="Ingresa tu país de residencia" onChange={handleChange} value={formData.pais_reside} />
            </div>
            <div className="input-group">
              <label>Cintura (cm)</label>
              <input id="cintura" type="text" placeholder="Ingresa tu medida de cintura" onChange={handleChange} value={formData.cintura} />
            </div>
            <div className="input-group">
              <label>Cuello (cm)</label>
              <input id="cuello" type="text" placeholder="Ingresa tu medida de cuello" onChange={handleChange} value={formData.cuello} />
            </div>
            <div className="input-group">
              <label>Caderas (cm)</label>
              <input id="caderas" type="text" placeholder="Ingresa tu medida de caderas" onChange={handleChange} value={formData.caderas} />
            </div>
            <div className="input-group">
              <label>% de músculo</label>
              <input id="porcentaje_musculo" type="text" placeholder="Ingresa tu porcentaje de músculo" onChange={handleChange} value={formData.porcentaje_musculo} />
            </div>
            <div className="input-group">
              <label>% de grasa</label>
              <input id="porcentaje_grasa" type="text" placeholder="Ingresa tu porcentaje de grasa" onChange={handleChange} value={formData.porcentaje_grasa} />
            </div>
            <div className="input-group">
              <label>Consumo diario máximo de calorías</label>
              <input id="consumo_calorias" type="text" placeholder="Ingresa tu consumo diario máximo de calorías" onChange={handleChange} value={formData.consumo_calorias} />
            </div>
          </>
        )}

        {role === "nutricionista" && (
          <>
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
          </>
        )}

        {role === "administrador" && (
          <>
            <div className="input-group">
              <label>Nombre de usuario</label>
              <input id="usuario_admin" type="text" placeholder="Ingresa tu nombre de usuario" onChange={handleChange} value={formData.usuario_admin} />
            </div>
          </>
        )}

        <button type="button" onClick={handleSubmit} className="btn-register">
          Registrarse
        </button>
        <p className="message">¡Estás a solo un paso de comenzar tu viaje hacia una mejor salud!</p>
      </form>
    </div>
  );
}

