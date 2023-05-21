import {useState} from "react";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Map from './components/map/Map';
import Partnership from './components/partnership/Partnership';
import ImagenComponente from "./components/ImagenComponent/imagenComponent";
import NewsletterForm from "./components/newsletter/Newsletter";
import SpeciesInfo from "./components/pages/SpeciesInfo";
import AmplifiedImages from "./components/amplifiedImagesComponent/AmplifiedImagesComponent";

import './App.css';

function App() {
  const [id, setId]=useState('');
  const [name, setName]=useState('');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <Header/> */}
      <Map changeId={setId} changeName={setName}/>
      <ImagenComponente id={id} name={name} open={setIsOpen}/>
      <AmplifiedImages name={name} handleClose={() => setIsOpen(false)} isOpen={isOpen}/>
      <SpeciesInfo speciesId={id}/>
      <NewsletterForm/>
      <Partnership/>
      <Footer/>
    </>
  );
}

export default App;
