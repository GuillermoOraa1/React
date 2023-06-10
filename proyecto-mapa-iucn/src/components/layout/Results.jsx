import {useState} from "react";
import ImagenComponente from "../ImagenComponent/imagenComponent";
import SpeciesInfo from "../pages/SpeciesInfo/SpeciesInfo";
import SpeciesConservationActions from "../pages/SpeciesConservationActions/SpeciesConservationActions";
import SpeciesHabitats from "../pages/SpeciesHabitats/SpeciesHabitats";
import SpeciesSummary from "../pages/SpeciesSummary/SpeciesSummary";
import SpeciesPopulation from "../pages/SpeciesPopulation/SpeciesPopulation";
import SpeciesThreats from "../pages/SpeciesThreats/SpeciesThreats";
import ImageTreatLevel from "../pages/SpeciesThreatLevel/ImageTreatLevel";

import AmplifiedImages from "../amplifiedImagesComponent/AmplifiedImagesComponent";
import './Results.css';

function Results({taxonid, name}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {taxonid && 
          <>
            <div className="info-container">
              <ImagenComponente id={taxonid} name={name} open={setIsOpen}/>
              <AmplifiedImages name={name} handleClose={() => setIsOpen(false)} isOpen={isOpen}/>
              <SpeciesInfo speciesId={taxonid}/>
            </div>
            <div className="species-container">
              <ImageTreatLevel speciesId={taxonid} />
              <div className="bordered-component">
                <SpeciesSummary speciesId={taxonid} />
              </div>
              <div className="bordered-component">
                <SpeciesPopulation speciesId={taxonid} />
              </div>
              <div className="bordered-component">
                <SpeciesHabitats speciesId={taxonid} />
              </div>
              <div className="bordered-component">
                <SpeciesThreats speciesId={taxonid} />
              </div>
              <div className="bordered-component">
                <SpeciesConservationActions speciesId={taxonid} />
              </div>
            </div>

          </>
        }
      </>
    );
  }
  
  export default Results;