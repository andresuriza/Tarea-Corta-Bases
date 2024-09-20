import React, { useState } from 'react';
import axios from 'axios';
import './GestionNutricionista.css';

export default function GestionNutricionista() {
  const [productData, setProductData] = useState({
    codigoBarras: '',
    descripcion: '',
    porcion: '',
    energia: '',
    grasa: '',
    sodio: '',
    carbohidratos: '',
    proteina: '',
    vitaminas: '',
    calcio: '',
    hierro: ''
  });

  const [clientSearch, setClientSearch] = useState('');
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleProductChange = (e) => {
    const { id, value } = e.target;
    setProductData({
      ...productData,
      [id]: value
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    // Enviar el producto al servidor para su revisión
    axios.post('http://127.0.0.1:5000/api/products', productData)
      .then(response => {
        alert('Producto enviado para revisión.');
        // Limpiar el formulario
        setProductData({
          codigoBarras: '',
          descripcion: '',
          porcion: '',
          energia: '',
          grasa: '',
          sodio: '',
          carbohidratos: '',
          proteina: '',
          vitaminas: '',
          calcio: '',
          hierro: ''
        });
      })
      .catch(error => {
        console.error('Error al enviar el producto:', error);
        alert('Hubo un error al enviar el producto.');
      });
  };

  const handleClientSearch = (e) => {
    setClientSearch(e.target.value);
    // Realizar la búsqueda de clientes
    axios.get(`http://127.0.0.1:5000/api/clients?query=${clientSearch}`)
      .then(response => {
        setClientList(response.data.clients);
      })
      .catch(error => {
        console.error('Error al buscar clientes:', error);
      });
  };

  const associateClient = (client) => {
    setSelectedClient(client);
    // Asociar el cliente al nutricionista
    axios.post('http://127.0.0.1:5000/api/associate-client', { clientId: client.id })
      .then(response => {
        alert(`Cliente ${client.nombre} asociado exitosamente.`);
      })
      .catch(error => {
        console.error('Error al asociar el cliente:', error);
      });
  };

  return (
    <div className="gestion-nutricionista">
      <h1>Gestión de Productos y Clientes</h1>

      {/* Sección para agregar productos */}
      <section className="gestion-productos">
        <h2>Agregar Nuevo Producto</h2>
        <form onSubmit={handleProductSubmit}>
          <div className="input-group">
            <label>Código de Barras</label>
            <input id="codigoBarras" type="text" value={productData.codigoBarras} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Descripción</label>
            <input id="descripcion" type="text" value={productData.descripcion} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Tamaño de la porción (g/ml)</label>
            <input id="porcion" type="text" value={productData.porcion} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Energía (Kcal)</label>
            <input id="energia" type="text" value={productData.energia} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Grasa (g)</label>
            <input id="grasa" type="text" value={productData.grasa} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Sodio (mg)</label>
            <input id="sodio" type="text" value={productData.sodio} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Carbohidratos (g)</label>
            <input id="carbohidratos" type="text" value={productData.carbohidratos} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Proteína (g)</label>
            <input id="proteina" type="text" value={productData.proteina} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Vitaminas</label>
            <input id="vitaminas" type="text" value={productData.vitaminas} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Calcio (mg)</label>
            <input id="calcio" type="text" value={productData.calcio} onChange={handleProductChange} required />
          </div>
          <div className="input-group">
            <label>Hierro (mg)</label>
            <input id="hierro" type="text" value={productData.hierro} onChange={handleProductChange} required />
          </div>
          <button type="submit">Enviar Producto</button>
        </form>
      </section>

      {/* Sección para búsqueda y asociación de clientes */}
      <section className="gestion-clientes">
        <h2>Buscar y Asociar Clientes</h2>
        <div className="input-group">
          <label>Buscar Cliente</label>
          <input type="text" value={clientSearch} onChange={handleClientSearch} placeholder="Introduce nombre o ID del cliente" />
        </div>
        <ul className="client-list">
          {clientList.map(client => (
            <li key={client.id}>
              {client.nombre} - {client.email}
              <button onClick={() => associateClient(client)}>Asociar</button>
            </li>
          ))}
        </ul>
        {selectedClient && <p>Cliente {selectedClient.nombre} asociado exitosamente.</p>}
      </section>
    </div>
  );
}
