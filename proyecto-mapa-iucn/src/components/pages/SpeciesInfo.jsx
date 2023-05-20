import { useState, useEffect } from "react";
import WikiComponent from './wikiComponent/WikiComponent';
import "./SpeciesInfo.css";


const SpeciesInfo = ({ speciesId }) => {
  const [speciesData, setSpeciesData] = useState(null);
  const [load,setLoad]= useState(false);

  useEffect(() => {
    
    const fetchSpeciesData = async () => {
      try {
        const response = await fetch(
          `https://apiv3.iucnredlist.org/api/v3/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        const data = await response.json();
        setSpeciesData(data.result[0]);
        setLoad(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpeciesData();
  }, [speciesId]);

  if (load===false) {
    return <div></div>;
  }
  
  if (!speciesData) {
    return <div>Cargando información...</div>;
  }

  return (
    <div className="species-info" id="speciesInfo">
      <div className="species-details">
        <h2>{speciesData.scientific_name}</h2>
        <p>{speciesData.main_common_name}</p>
        <p><strong>Estado:</strong> {speciesData.category}</p>
        <p><strong>Reino:</strong> {speciesData.kingdom}</p>
        <p><strong>Filum:</strong> {speciesData.phylum}</p>
        <p><strong>Clase:</strong> {speciesData.class}</p>
        <p><strong>Orden:</strong> {speciesData.order}</p>
        <p><strong>Familia:</strong> {speciesData.family}</p>
        <p><strong>Género:</strong> {speciesData.genus}</p>
        <p><strong>Razón de amenaza:</strong> {speciesData.amended_reason}</p>
        <WikiComponent scientificName={speciesData.scientific_name}/>
      </div>
    </div>
  );
};

export default SpeciesInfo;
