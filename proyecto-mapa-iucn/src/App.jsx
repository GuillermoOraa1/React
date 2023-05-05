import {useState} from "react";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Map from './components/map/Map';
import ImagenComponente from "./components/ImagenComponent/imagenComponent";

import './App.css';

function App() {
  const [id, setId]=useState('');
  return (
    <>
      <Header/>
      <Map changeId={setId}/>
      <ImagenComponente id={id}/>
      <Footer/>
    </>
  );
}

export default App;
