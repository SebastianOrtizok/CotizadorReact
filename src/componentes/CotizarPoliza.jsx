import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BtnVolver from "./BtnVolver";

function CotizarPoliza() {
  const location = useLocation();
  const selectedData = location.state.selectedData;
  let valorMetroCuadrado = 35.86;
  let resultado = valorMetroCuadrado * selectedData.factor * selectedData.ubicacion * selectedData.metrosCuadrados;

  const cotizacionObj = {
    selectedData: selectedData,
    resultado: resultado,
  };
console.log(cotizacionObj)

  const [cotizacionGuardada, setCotizacionGuardada] = useState(false);

  const handleGuardarCotizacion = () => {
    const cotizacionesAnteriores = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizacionesAnteriores.push(cotizacionObj);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesAnteriores));
    setCotizacionGuardada(true);
  };

  return (
    <div className="main">
    <table className="table table-striped table-hover table-responsive">
  <thead>
    <tr>
      <th className="text-center mobile-column">Ubicación</th>
      <th className="text-center mobile-column"> %</th>
      <th className="text-center mobile-column">Tipo</th>
      <th className="text-center mobile-column">%</th>
      <th className="text-center mobile-column">M2</th>
      <th className="text-center mobile-column">Total</th>
      <th className="text-center mobile-column">Guardar</th>
    </tr>
  </thead>
  <tbody>
<tr>
        <td className="text-center mobile-column">{selectedData.ubicacionText}</td>
        <td className="text-center mobile-column">{selectedData.ubicacion}</td>
        <td className="text-center mobile-column">{selectedData.tipo}</td>
        <td className="text-center mobile-column">{selectedData.factor}</td>
        <td className="text-center mobile-column">{selectedData.metrosCuadrados}</td>
        <td className="text-center mobile-column">$ {cotizacionObj.resultado.toFixed(2)
}</td>
        <td className="text-center mobile-column">{cotizacionGuardada ? (
        <p>Cotización guardada 👍</p>
      ) : (

        <button className="buttonCotizacion"  onClick={handleGuardarCotizacion}>
        Guardar cotización
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
      )}</td>
      </tr>

  </tbody>
</table>
<h1>$ {cotizacionObj.resultado.toFixed(2)}</h1>

      <BtnVolver />
    </div>
  );
}

export default CotizarPoliza;
