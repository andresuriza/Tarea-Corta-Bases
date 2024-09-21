import React from "react";
import "./GoalsSection.css";

// Importar las imágenes locales
import diaryImage from "../images/dairy.png";
import barcodeImage from "../images/food.png";
import scaleImage from "../images/goal.png";
import saladImage from "../images/nutrition.png";

// Funcion que contiene imagenes y texto informativo para la pagina principal
function GoalsSection() {
  return (
    <div className="goals-container">
      <h1>Las herramientas para tus objetivos</h1>
      <p>
        ¿Quieres gestionar tu nutrición, registrar tus medidas o seguir un plan
        alimenticio creado por tu nutricionista? Te ofrecemos las funciones que
        necesitas para mejorar tu salud y alcanzar tus metas.
      </p>

      <div className="goals-items">
        <div className="goal-card">
          <img
            src={diaryImage}
            alt="Registra tu alimentación"
            className="goal-image"
          />
          <h3>Registra tu alimentación</h3>
          <p>
            Lleva un registro diario de tus comidas, busca productos por nombre
            o código de barras, y registra tu consumo de manera sencilla.
          </p>
        </div>

        <div className="goal-card">
          <img
            src={barcodeImage}
            alt="Gestión de productos y recetas"
            className="goal-image"
          />
          <h3>Gestión de productos y recetas</h3>
          <p>
            Agrega nuevos productos o crea recetas personalizadas para calcular
            las calorías y nutrientes de manera detallada.
          </p>
        </div>

        <div className="goal-card">
          <img
            src={scaleImage}
            alt="Registro de medidas"
            className="goal-image"
          />
          <h3>Registro de medidas</h3>
          <p>
            Lleva un control de tus medidas como cintura, cuello, caderas, y
            otros indicadores para ver tu progreso a lo largo del tiempo.
          </p>
        </div>

        <div className="goal-card">
          <img
            src={saladImage}
            alt="Plan nutricional personalizado"
            className="goal-image"
          />
          <h3>Plan nutricional personalizado</h3>
          <p>
            Si estás asociado con un nutricionista, sigue un plan alimenticio
            personalizado y obtén retroalimentación sobre tu progreso.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoalsSection;
