import React, { useState, useEffect } from "react";

const ImagenesComponente = ({name})=>{
  const [datos, setDatos] = useState([]);
  useEffect(() => {
      fetch("http://localhost:8000/photo-google/images/"+name)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data.photo)
      });
  }, [name]);  

  //const urlsImages=["https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg","https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg","https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg"]
  //var urlsImages=["https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg"];


  /*   const [login, setLoading] = useState(false);
  var imagenes=null;
  useEffect(() => {
    if(name && urlsImages.length<5){
      //setLoading(true);
      setTimeout(()=>{
          urlsImages.push("https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg");
          urlsImages.push("https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg");
          urlsImages.push("https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg");
          urlsImages.push("https://upload.wikimedia.org/wikipedia/commons/5/5e/Balistapus_undulatus_%28Nausica%C3%A4%29.jpg");
          setLoading(true);
          console.log(urlsImages);
        },3000);
    }
  }, [name]); */





  return(
  <>
      {datos.map(item => (
        <img src={item} alt="imagenBicho" width='100px' height='100px'/>
      ))}
      
      {/* !login && imagenes */}
      {/* { login ? urlsImages.map((url)=>(<img src={url} alt="imagenBicho" width='100px' height='100px'/>)):null} */}
  </>
  );
}

export default ImagenesComponente;



