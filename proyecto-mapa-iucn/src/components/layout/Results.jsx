import {useState} from "react";
import ImagenComponente from "../ImagenComponent/imagenComponent";
import SpeciesInfo from "../pages/SpeciesInfo";
import AmplifiedImages from "../amplifiedImagesComponent/AmplifiedImagesComponent";

function Results({taxonid, name}) {
  const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <a href="http://localhost:3000/">Return</a>
        <ImagenComponente id={taxonid} name={name} open={setIsOpen}/>
        <AmplifiedImages name={name} handleClose={() => setIsOpen(false)} isOpen={isOpen}/>
        {taxonid && <SpeciesInfo speciesId={taxonid}/>}
      </>
    );
  }
  
  export default Results;