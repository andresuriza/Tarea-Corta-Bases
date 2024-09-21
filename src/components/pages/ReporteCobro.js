import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import './ReporteCobro.css';

export default function ReporteCobro() {
  const [reportData, setReportData] = useState([]);
  const [tipoPago, setTipoPago] = useState('Semanal');
  const navigate = useNavigate(); // useNavigate para manejar la navegación

  // useEffect para verificar el rol y redirigir si no es administrador
  useEffect(() => {
    const rol = localStorage.getItem('userRole');
    if (rol !== 'administrador') {
      navigate('/'); // Redirige al home si el rol no es administrador
    }
  }, [navigate]); // Se ejecuta solo cuando el componente se monta

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nutricionistas'); // Ajusta la URL si es necesario
        setReportData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    
    fetchData();
  }, []);

  const exportarPDF = () => {
    window.print();
  };

  const calcularMontoTotal = (clientesAsociados) => {
    let total = clientesAsociados * 1; // Cada cliente paga 1 dólar
    if (tipoPago === 'Mensual') {
      total *= 0.95; // 5% de descuento
    } else if (tipoPago === 'Anual') {
      total *= 0.90; // 10% de descuento
    }
    return total.toFixed(2);
  };

  // Filtrar nutricionistas según el tipo de cobro
  const nutricionistasFiltrados = reportData.filter(nutricionista => nutricionista.cobro === tipoPago.toLowerCase());

  return (
    <div className="reporte-cobro">
      <h1>Reporte de Cobro</h1>
      <p>Este reporte muestra el cobro para los nutricionistas agrupado por tipo de pago.</p>

      <div className="input-group">
        <label>Tipo de Pago:</label>
        <select value={tipoPago} onChange={(e) => setTipoPago(e.target.value)}>
          <option value="Semanal">Semanal</option>
          <option value="Mensual">Mensual</option>
          <option value="Anual">Anual</option>
        </select>
      </div>

      <div className="report-table">
        <table>
          <thead>
            <tr>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Número de Tarjeta</th>
              <th>Monto Total</th>
              <th>Descuento</th>
              <th>Monto a Cobrar</th>
            </tr>
          </thead>
          <tbody>
            {nutricionistasFiltrados.map(nutricionista => (
              <tr key={nutricionista.id}>
                <td>{nutricionista.email}</td>
                <td>{nutricionista.nombre}</td>
                <td>{nutricionista.numeroTarjeta}</td>
                <td>{nutricionista.clientesAsociados}</td>
                <td>{tipoPago === 'Semanal' ? '0%' : tipoPago === 'Mensual' ? '5%' : '10%'}</td>
                <td>{calcularMontoTotal(nutricionista.clientesAsociados)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={exportarPDF}>Exportar a PDF / Imprimir</button>
    </div>
  );
}
