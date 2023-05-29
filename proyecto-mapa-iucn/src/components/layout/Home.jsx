import {useState} from "react";
import Map from '../map/Map';
import Partnership from '../partnership/Partnership';
import ImagenComponente from "../ImagenComponent/imagenComponent";
import NewsletterForm from "../newsletter/Newsletter";
import SpeciesInfo from "../pages/SpeciesInfo";
import AmplifiedImages from "../amplifiedImagesComponent/AmplifiedImagesComponent";

function Home() {
    const [id, setId]=useState('');
    const [name, setName]=useState('');
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Map changeId={setId} changeName={setName}/>
        <ImagenComponente id={id} name={name} open={setIsOpen}/>
        <AmplifiedImages name={name} handleClose={() => setIsOpen(false)} isOpen={isOpen}/>
        {id && <SpeciesInfo speciesId={id}/>}
        <NewsletterForm/>
        <Partnership/>
      </>
    );
  }
  
  export default Home;
  