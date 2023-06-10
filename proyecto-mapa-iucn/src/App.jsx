import {useState} from "react";
import {Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import ExtinctList from './components/extinctList/extinctList';
import Searcher from './components/searcher/Searcher';
import Footer from './components/footer/Footer';
import Home from './components/layout/Home';
import Results from './components/layout/Results';




import './App.css';

function App() {
  const [taxonidId, setTaxonidId]=useState('');
  const [name, setName]=useState('');
  const [focus, setFocus]=useState(false);
  const [family, setFamily]=useState('');
  
  return (
    <>
      <Header focus={focus} family={family} changeFocus={setFocus} changeFamily={setFamily}/>
      <ExtinctList focus={focus} family={family}/>
      <Searcher changeTaxonid={setTaxonidId} changeName={setName}/>
      <Routes>
        <Route index element={<Home />} ></Route>
        <Route path="/search" element={<Results taxonid={taxonidId} name={name}/>} ></Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;