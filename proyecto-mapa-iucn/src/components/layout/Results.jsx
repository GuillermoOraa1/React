import {useState} from "react";
import {NavLink} from "react-router-dom";
import ImagenComponente from "../ImagenComponent/imagenComponent";
import SpeciesInfo from "../pages/SpeciesInfo";
import SpeciesConservationActions from "../pages/SpeciesConservationActions/SpeciesConservationActions";
import SpeciesHabitats from "../pages/SpeciesHabitats/SpeciesHabitats";
import SpeciesSummary from "../pages/SpeciesSummary/SpeciesSummary";
import SpeciesThreats from "../pages/SpeciesThreats/SpeciesThreats";
import AmplifiedImages from "../amplifiedImagesComponent/AmplifiedImagesComponent";
import './Results.css';

function Results({taxonid, name}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <NavLink className="" to="/">Return</NavLink>
        {taxonid && 
          <div className="info-container">
            <ImagenComponente id={taxonid} name={name} open={setIsOpen}/>
            <AmplifiedImages name={name} handleClose={() => setIsOpen(false)} isOpen={isOpen}/>
            <SpeciesInfo speciesId={taxonid}/>
            <SpeciesHabitats speciesId={taxonid} />
            <SpeciesThreats speciesId={taxonid} />
            <SpeciesConservationActions speciesId={taxonid} />
            <SpeciesSummary speciesId={taxonid} />
          </div>
        }
      </>
    );
  }
  
  export default Results;