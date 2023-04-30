import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WishInput=({onNewWish}) => {
  const [newWishText, setNewWishText]= useState('');
  return (<fieldset className="wish-input">
    <legend className="wish-input__label">New wish</legend>
    <input 
        className="wish-input__field" 
        placeholder="Enter your wish" 
        value={newWishText} 
        onChange= {event => setNewWishText(event.target.value)}
        onKeyUp= {event => {
            if(event.key=='Enter'){ /* Si la tecla presionada es Enter, llamamos a la funcion callback que recibe como parametro el componente */
                onNewWish({texto:newWishText, done:false}); /* Le pasamos a la funcion callback dos parametros y hacemos que se ejecute */
                setNewWishText(''); /* limpiamos el contenido del input */
            }
        }}
    /> 
    {/* newWishText sera el valor del input que vamos a manejar, y cuando ese input cambie se cambiara el valor de newWishText */}
  </fieldset>);
};

WishInput.propTypes = {
  onNewWish: PropTypes.func,
};

WishInput.defaultProps = { onNewWish: () => {} };

export default WishInput;
