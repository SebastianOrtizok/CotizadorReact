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
      <th className="text-center">Ubicación</th>
      <th className="text-center"> %</th>
      <th className="text-center">Tipo</th>
      <th className="text-center">%</th>
      <th className="text-center">M2</th>
      <th className="text-center">Total</th>
      <th className="text-center">Guardar</th>
    </tr>
  </thead>
  <tbody>
<tr>
        <td className="text-center">{selectedData.ubicacionText}</td>
        <td className="text-center">{selectedData.ubicacion}</td>
        <td className="text-center">{selectedData.tipo}</td>
        <td className="text-center">{selectedData.factor}</td>
        <td className="text-center">{selectedData.metrosCuadrados}</td>
        <td className="text-center">$ {cotizacionObj.resultado.toFixed(2)
}</td>
        <td className="text-center">{cotizacionGuardada ? (
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
