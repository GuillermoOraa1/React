import React, { useState, useEffect } from "react";
import './imagenComponent.css';
const ComponenteImagen = ({id,name,open})=>{
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if(id){
        setLoading(true);
        fetch(`http://localhost:8000/photo/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if(data.photo===""){
            fetch(`http://localhost:8000/photo-google/icon/${name}`)
            .then((res) => res.json())
            .then((data) => {setUrl(data.photo)});
          } else{
            setUrl(data.photo);
          }         
          setLoading(false);
        });
      }
    }, [id,name]);

    return(
    <>
        {loading && <p>Loading information...</p>}
        {!loading && id &&(<img src={url} alt="" onClick={() => open(true)} className="imagen"/>)}
    </>
    );
}

export default ComponenteImagen;