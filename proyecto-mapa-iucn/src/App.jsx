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
  return (
    <>
      <Header/>
      <Map changeId={setId}/>
      <ImagenComponente id={id}/>
      <AmplifiedImages id={id}/>
      <SpeciesInfo speciesId={id}/>
      <NewsletterForm/>
      <Partnership/>
      <Footer/>
    </>
  );
}

export default App;
