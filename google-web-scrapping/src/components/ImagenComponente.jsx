import React, { useState, useEffect } from "react";

const ImagenComponente = ({name,open})=>{
  const [url, setUrl] = useState("");
  const [login, setLoading] = useState(false);
  useEffect(() => {
    if(name){
      fetch("http://localhost:8000/photo-google/icon/"+name)
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.photo);
          setLoading(false);
      });
    }
  }, [name]);

  return(
    <>
      {!login && name &&(
      <>
        <img src={url} width="170px" height="auto" onClick={() => open(true)} />
      </>
      )}   
    </>


);
} 

export default ImagenComponente;