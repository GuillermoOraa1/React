import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WishItem from './WishItem';

const WishList= ({deseos, onWishesChange})=>( /* Este evento se va a lanzar cada vez que se modifique el estado de un deseo y nos va a devolver un array con el estado de los nuevos deseos */
    <ul className="wish-list">
    {deseos.map(({ texto, done }, i) => (
       <WishItem texto={texto} done={done} id={`wish${i}`} key={texto} onDoneChange={(value)=>{
        const updatedWishes =[...deseos]; /*Creamos una copia del array de deseos que recibimos para poder modificarla */
        updatedWishes[i].done=value;
        onWishesChange(updatedWishes);
       }} />
    ))}
    </ul>
);

WishList.propTypes = {
  deseos: PropTypes.arrayOf( PropTypes.shape({ texto: PropTypes.string, done: PropTypes.bool})),
  onWishesChange: PropTypes.func,
};

WishList.defaultProps = {
  deseos: [],
  onWishesChange: () => {},
}; //si le ponemos un valor por defecto, no hace falta poner el ".isRequired"
export default WishList;
