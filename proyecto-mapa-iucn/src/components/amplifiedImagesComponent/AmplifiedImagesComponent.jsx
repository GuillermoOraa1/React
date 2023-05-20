import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import arrowL from '../../assets/images/left-arrow.png';
import arrowR from '../../assets/images/right-arrow.png';
import "./AmplifiedImagesComponent.css";

const AmplifiedImagesComponent = ({name, isOpen, handleClose})=>{
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState([]);
    const [indiceImagen, setIndiceImagen] = useState(0);
 
    useEffect(() => {
      if(name){
        setLoading(true);
        fetch(`http://localhost:8000/photo-google/images/${name}`)
        .then((res) => res.json())
        .then((data) => {
          setDatos(data.photo);
          setLoading(false);
        });
      }
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
          <button className="buttonClose" onClick={handleClose}>X</button> 
          <input className="arrow-left" src={arrowR} type="image" alt="left arrow" onClick={anteriorImagen} />
            {!loading && datos.map((item,index) => (
                  <div key={index} className={index===indiceImagen?"slide active":"slide"}>
                    {/* Si la key de la imagen es igual al indiceImagen que hay en ese momento, se mostrara esa imagen */}
                    {index===indiceImagen && (<img src={item} key={index} alt="imagenBicho" width='500px' height='480px'/>)} 
                  </div>      
            ))}
          <input className="arrow-right" src={arrowL} type="image" alt="left arrow" onClick={siguienteImagen} />
        </div>
      </Dialog>  
    );

};

export default AmplifiedImagesComponent;