import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ubicacion from "./Ubicacion";
import MetrosCuadrados from "./MetrosCuadrados";

function ProductosList() {
  const [propiedades, setPropiedades] = useState([]);
  const [selectedLink, setSelectedLink] = useState("");
  const [selectedUbicacion, setSelectedUbicacion] = useState("1.13");
  const [selectedMetrosCuadrados, setSelectedMetrosCuadrados] = useState("");
  const [selectedPropiedad, setSelectedPropiedad] = useState("Casa");
  const [selectedUbicacionText, setSelectedUbicacionText] = useState("CABA");
  const [showAlert, setShowAlert] = useState(false);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const property = propiedades.find((propiedad) => propiedad.id === selectedValue);
    setSelectedPropiedad(property);
     const productLink = property
      ? `/${property.id}?ubicacion=${selectedUbicacion}&metrosCuadrados=${selectedMetrosCuadrados}`
      : "";

    setSelectedLink(productLink);
  };

  const handleUbicacionChange = (event) => {
    const selectedUbicacionValue = event.target.value;
    const selectedUbicacionText = event.target.options[event.target.selectedIndex].getAttribute('data-text'); 
    setSelectedUbicacion(selectedUbicacionValue);
    setSelectedUbicacionText(selectedUbicacionText); 
  };
  


  useEffect(() => {
    fetch("https://653831aaa543859d1bb14d53.mockapi.io/propiedades")
      .then((res) => res.json())
      .then((datos) => setPropiedades(datos));
  }, []);


  const handleMetrosCuadradosChange = (event) => {
    const selectedMetrosCuadrados = event.target.value;
    setShowAlert(false);
    setSelectedMetrosCuadrados(selectedMetrosCuadrados);
  };


  const selectedData = {
    ubicacion: selectedUbicacion, 
    ubicacionText: selectedUbicacionText, 
    metrosCuadrados: selectedMetrosCuadrados,
    tipo: selectedPropiedad?.tipo || "Casa",
    factor: selectedPropiedad?.factor || 1.09
  };

  function chequear(event){
    if (selectedMetrosCuadrados==""){
      setShowAlert(true);
      event.preventDefault();
    }
  }
  

  return (
    <>
      <h1>Seleccione el tipo de propiedad</h1>
      <div className="main">
      <Link to="/mostrarcotizacion">
        <button> Cotizaciones guardadas💾</button>
      </Link>
      <select onChange={handleSelectChange}>
        {propiedades.map((propiedad) => (
          <option key={propiedad.id} value={propiedad.id}>
            {propiedad.tipo}
          </option>
        ))}
      </select>
      <Ubicacion ubicacion={selectedUbicacion} onChange={handleUbicacionChange} />
      {showAlert && (
        <div className="alert">
          Debe ingresar los metros cuadrados.
        </div>
      )}
      <MetrosCuadrados metrosCuadrados={selectedMetrosCuadrados} onChange={handleMetrosCuadradosChange} />
      <Link to={`${selectedLink}&ubicacion=${selectedUbicacion}&metrosCuadrados=${selectedMetrosCuadrados}`} state={{ selectedData }}>
       <button onClick={chequear}>Siguiente ⏭</button>
      </Link>

      </div>
    </>
  );
}

export default ProductosList;
