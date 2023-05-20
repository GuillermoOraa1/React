import React, { useState, useEffect } from "react";

/* const ComponenteImagen = ({id})=>{
  const [login, setLoading] = useState(false);
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    if(id){
      setLoading(true);
      fetch("http://localhost:8000/photo/"+id)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data.photo);
        setLoading(false);
      });
    }
  }, [id]); 
  return(
    <>
        {!login && datos.map((value,key) => (<img src={value} key={key} alt="imagenBicho" width='100px' height='100px'/>))}
    </>
  );
} */

const ComponenteImagen = ({id,name})=>{
    const [url, setUrl] = useState("");
    const [login, setLoading] = useState(false);
    useEffect(() => {
      if(id){
        setLoading(true);
        fetch("http://localhost:8000/photo/"+id)
        .then((res) => res.json())
        .then((data) => {
          if(data.photo===undefined){
            fetch("http://localhost:8000/photo-google/icon/"+name)
            .then((res) => res.json())
            .then((data) => {setUrl(data.photo)});
          } else{
            setUrl(data.photo);
          }         
          setLoading(false);
        });
      }
    }, [id]);

    return(
    <>
        {!login && id &&(<img src={url} width="170px" height="auto" />)}
    </>
    );
}

export default ComponenteImagen;