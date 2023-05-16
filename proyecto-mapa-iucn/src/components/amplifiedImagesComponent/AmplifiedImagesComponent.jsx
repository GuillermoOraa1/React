import React, { useState, useEffect } from "react";

const AmplifiedImagesComponent = ({id})=>{
    const [scientificName, setScientificName] = useState("");
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState([]);

 
    useEffect(() => {
      if(id){
        const fetchData = async () => {
          try{
            const response1 = await fetch(`https://apiv3.iucnredlist.org/api/v3/species/id/${id}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`);
            const data1 = await response1.json();
            setScientificName(data1.result[0].scientific_name);

            const response2 = await fetch(`http://localhost:8000/photo-google/images/${scientificName}`);
            const data2 = await response2.json();
            setDatos(data2.photo);
            setLoading(false);
            
          }catch (error) {
            console.error('Error:', error);
          }
        }
        fetchData();
      }
    }, [id]);

    return(
      <>
          {!loading && datos.map((value,key) => (<img src={value} key={key} alt="imagenBicho" width='100px' height='100px'/>))}
      </>
    );

};

export default AmplifiedImagesComponent;