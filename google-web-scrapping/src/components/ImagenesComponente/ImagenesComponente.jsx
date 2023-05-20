import React, { useState, useEffect } from "react";
import './ImagenesComponente.css';

const ImagenesComponente = ({name})=>{
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [datos, setDatos] = useState([]);
  //const [imageError, setImageError] = useState(false);
  useEffect(() => {
      fetch("http://localhost:8000/photo-google/images/"+name)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data.photo);
      });
  }, [name]); 
  
  const siguienteImagen= ()=>{
    if(indiceImagen<3){
      setIndiceImagen(indiceImagen+1);
    } 
  }

  const anteriorImagen= ()=>{
    if(indiceImagen>0){
      setIndiceImagen(indiceImagen-1);
    } 
  }

  return(
  <div className="container">
      {/* {datos.map(item => (
        imageError?(<p>Error al cargar la imagen</p>):(<img src={item} alt="imagenBicho" onError={setImageError(true)} width='100px' height='100px'/>)  
      ))} */}
      <button onClick={anteriorImagen}>&#9664;</button>
      {datos.map((item,index) => (
        <div key={index} className={index===indiceImagen?"slide active":"slide"}>
          {/* Si la key de la imagen es igual al indiceImagen que hay en ese momento, se mostrara esa imagen */}
          {index===indiceImagen && (<img src={item} key={index} alt="imagenBicho" width='600px' height='600px'/>)} 
        </div>      
      ))}
      <button onClick={siguienteImagen}>&#9654;</button>
      
  </div>
  );
}

export default ImagenesComponente;



