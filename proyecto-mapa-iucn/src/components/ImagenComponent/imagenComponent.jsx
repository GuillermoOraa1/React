import React, { useState, useEffect } from "react";

const ComponenteImagen = ({id})=>{
    const [url, setUrl] = useState("");

    /* useEffect(() => {
      setUrl("http://localhost:8000/photo/"+id);
    }, [id]); */
    useEffect(() => {
    fetch("http://localhost:8000/photo/"+id)
      .then((res) => res.json())
      .then((data) => setUrl(data.photo));
    }, [id]);

    return(
    <>
        {/* <p>{url}</p> */}
        <img src={url} width="170px" height="auto" />
    </>
);
}

export default ComponenteImagen;