import { useState } from "react";
import ImagenesComponente from "./components/ImagenesComponente/ImagenesComponente.jsx";
import ImagenComponente from "./components/ImagenComponente";
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <p>xxxxx</p>     
      <ImagenComponente name={"Pangasius sanitwongsei"} open={setIsOpen}/>
      <p>cccccccc</p>
      <ImagenesComponente name={"Pangasius sanitwongsei"} handleClose={() => setIsOpen(false)} isOpen={isOpen}/>
      <p>yyyyyy</p>
    </div>
  );
}

export default App;
