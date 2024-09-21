import React from "react";
import "./ArticleSection.css";

// Importar las imágenes locales
import healthyFoodImage3 from "../images/nutricionista.png";
import healthyFoodImage4 from "../images/saludable.png";
import healthyFoodImage5 from "../images/comida.png";

// Funcion que contiene las imagenes e informacion sobre la nutricion presentadas en la pagina principal
function ArticleSection() {
  return (
    <div className="article-container">
      <div className="article-hero">
        <h1>La Importancia de la Nutrición</h1>
        <p>
          Cómo una alimentación balanceada puede mejorar tu salud y bienestar
        </p>
      </div>

      <div className="article-content">
        <div className="article-section">
          <img
            src={healthyFoodImage3}
            alt="Comida saludable"
            className="article-image"
          />
          <h2>¿Qué es la nutrición?</h2>
          <p>
            La nutrición es la ciencia que interpreta la relación entre los
            alimentos y la salud. Tener una dieta equilibrada es esencial para
            el buen funcionamiento de nuestro cuerpo, ya que proporciona los
            nutrientes que necesitamos para mantenernos activos, saludables y
            prevenir enfermedades.
          </p>
        </div>

        <div className="article-section">
          <h2>Beneficios de una dieta balanceada</h2>
          <p>
            Una dieta balanceada tiene múltiples beneficios. Mejora el sistema
            inmunológico, reduce el riesgo de enfermedades crónicas, ayuda a
            mantener un peso saludable y mejora la función cognitiva. Además,
            una alimentación adecuada tiene un impacto directo en el estado de
            ánimo y los niveles de energía diarios.
          </p>
          <img
            src={healthyFoodImage4}
            alt="Plato con vegetales frescos"
            className="article-image"
          />
        </div>

        <div className="article-section">
          <h2>Consejos para mejorar tu alimentación</h2>
          <ul>
            <li>Incorpora más frutas y verduras frescas en cada comida.</li>
            <li>Bebe al menos 2 litros de agua al día.</li>
            <li>Reduce el consumo de alimentos ultraprocesados.</li>
            <li>
              Prefiere las fuentes de proteínas magras, como pollo o pescado.
            </li>
          </ul>
          <img
            src={healthyFoodImage5}
            alt="Mesa con alimentos saludables"
            className="article-image"
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleSection;
