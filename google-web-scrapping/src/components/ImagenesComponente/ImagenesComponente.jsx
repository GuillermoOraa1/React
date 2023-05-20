import React, { useState, useEffect, useRef  } from "react";
import Dialog from '@mui/material/Dialog';
import './ImagenesComponente.css';
import arrowR from '../../images/right-arrow.png';
import arrowL from '../../images/left-arrow.png';

const ImagenesComponente = ({name, isOpen, handleClose})=>{
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

  
	useEffect(() => {
		const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [handleClose]);
  
  const siguienteImagen= ()=>{
    if(indiceImagen===3) setIndiceImagen(0);
    if(indiceImagen<3){
      setIndiceImagen(indiceImagen+1);
    } 
  }

  const anteriorImagen= ()=>{
    if(indiceImagen===0) setIndiceImagen(3);
    if(indiceImagen>0){
      setIndiceImagen(indiceImagen-1);
    } 
  }

  return(
    <Dialog aria-labelledby="customized-dialog-title" open={isOpen}>
          <div className="container">
              {/* {datos.map(item => (
                imageError?(<p>Error al cargar la imagen</p>):(<img src={item} alt="imagenBicho" onError={setImageError(true)} width='100px' height='100px'/>)  
              ))} */}
              <button className="buttonClose" onClick={handleClose}>X</button> 
              <input className="arrow-left" src={arrowR} type="image" alt="left arrow" onClick={anteriorImagen} />
              {/* <button onClick={anteriorImagen}>&#9664;</button> */}
              {datos.map((item,index) => (
                <div key={index} className={index===indiceImagen?"slide active":"slide"}>
                  {/* Si la key de la imagen es igual al indiceImagen que hay en ese momento, se mostrara esa imagen */}
                  {index===indiceImagen && (<img src={item} key={index} alt="imagenBicho" width='500px' height='480px'/>)} 
                </div>      
              ))}
              <input className="arrow-right" src={arrowL} type="image" alt="left arrow" onClick={siguienteImagen} />
              
          </div>
    </Dialog>

  );
}

export default ImagenesComponente;



