import {useState} from "react";
import Map from '../map/Map';
import Partnership from '../partnership/Partnership';
import ImagenComponente from "../ImagenComponent/imagenComponent";
import NewsletterForm from "../newsletter/Newsletter";
import SpeciesInfo from "../pages/SpeciesInfo";
import SpeciesConservationActions from "../pages/SpeciesConservationActions/SpeciesConservationActions";
import SpeciesHabitats from "../pages/SpeciesHabitats/SpeciesHabitats";
import SpeciesSummary from "../pages/SpeciesSummary/SpeciesSummary";
import SpeciesThreats from "../pages/SpeciesThreats/SpeciesThreats";
import AmplifiedImages from "../amplifiedImagesComponent/AmplifiedImagesComponent";
import './Home.css';

function Home() {
    const [id, setId]=useState('');
    const [name, setName]=useState('');
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Map changeId={setId} changeName={setName}/>
        {id && 
          <div className="info-container">
            <ImagenComponente id={id} name={name} open={setIsOpen}/>
            <AmplifiedImages name={name} handleClose={() => setIsOpen(false)} isOpen={isOpen}/>
            <SpeciesInfo speciesId={id}/>
            <SpeciesHabitats speciesId={id} />
            <SpeciesThreats speciesId={id} />
            <SpeciesConservationActions speciesId={id} />
            <SpeciesSummary speciesId={id} />
          </div>
        }
        <NewsletterForm/>
        <Partnership/>
      </>
    );
  }
  
  export default Home;
  