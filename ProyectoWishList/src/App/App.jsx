import React, { useState } from 'react';
import classNames from 'classnames';
import './app2.css';
import WishInput from './Wishinput';
import WishList from './WishList/WishList';

const deseosIniciales = [
  { texto: 'viajar', done: false }, { texto: 'cantar', done: true }, { texto: 'ejercicio', done: false },
];
const App = () => {
  const [wishes, setWishes] = useState(deseosIniciales);
  console.log(wishes);
  return (
  <div className="app">
    <h1>Hello world</h1>
    <WishInput onNewWish={deseo => {
      console.log(deseo);
      setWishes([deseo, ...wishes])
      }}/>
    <WishList deseos={wishes} onWishesChange={wishes=>setWishes(wishes)}/>
    <button type="button" className="wish-clear" onClick={()=>setWishes(wishes.filter(wish=>!wish.done))}>Guardar</button>
  </div>
  );
};

export default App;
