import { useState, useEffect } from "react";
import {NavLink, useLocation} from "react-router-dom";
import WikiComponent from '../wikiComponent/WikiComponent';
import "./SpeciesInfo.css";


const SpeciesInfo = ({ speciesId }) => {

  const [speciesData, setSpeciesData] = useState(null);
  const [load,setLoad]= useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setLoad(false);
    fetch(`https://apiv3.iucnredlist.org/api/v3/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`)
    .then((res) => res.json())
    .then((data) => {
      setSpeciesData(data.result[0]);
      setLoad(true);
    });
  }, [speciesId]);

  return (
    <div className="species-info" id="speciesInfo">
      <div className="species-details">
        {!load && <p>Cargando datos...</p>}
        {speciesData &&
        <>
          <h2>{speciesData.scientific_name}</h2>
          <hr className="redLine" /> 
          <p>{speciesData.main_common_name}</p>
          <hr className="greyLine" />
          <p><strong>Status:</strong> {speciesData.category}</p>
          <p><strong>Kingdom:</strong> {speciesData.kingdom}</p>
          <p><strong>Phylum:</strong> {speciesData.phylum}</p>
          <p><strong>Class:</strong> {speciesData.class}</p>
          <p><strong>Order:</strong> {speciesData.order}</p>
          <p><strong>Family:</strong> {speciesData.family}</p>
          <p><strong>Genus:</strong> {speciesData.genus}</p>
          <WikiComponent scientificName={speciesData.scientific_name}/>  
          <NavLink to="/" style={{ display: pathname !== '/search' ? 'none' : 'block' }}>
		        <button className="species-button">Return</button>
	        </NavLink>        
        </>
        }
      </div>
    </div>
  );
};

export default SpeciesInfo;
