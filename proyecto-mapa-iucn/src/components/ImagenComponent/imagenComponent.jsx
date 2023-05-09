import React, { useState, useEffect } from "react";

const ComponenteImagen = ({id})=>{
    const [url, setUrl] = useState("");
    const [login, setLoading] = useState(false);
    useEffect(() => {
      if(id){
        setLoading(true);
        fetch("http://localhost:8000/photo/"+id)
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.photo);
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