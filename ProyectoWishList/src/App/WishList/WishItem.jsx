import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WishItem = ({done, texto, id, onDoneChange}) => {
  const [age,setAge] = useState(0);
  useEffect(()=>{
    let ageInterval;
    if(done){setAge(0);}
    else {
      ageInterval=setInterval(()=>{
        if(done){clearInterval(ageInterval);} /*Si por algun motivo se ejecuta este callback y en el intervalo ya hemos completado la tarea,cancelamos el intervalo */
        setAge(age=>age+1);
      },1000);
      console.log(age);
    }
    return () =>{clearInterval(ageInterval)}; /*Si antes de ejecutar el "clearInterval" asociado al "done" se borrase el componente, con esta funcion nos aseguramos que se cierra el setinterval*/
  },[done]); /*Iniciamos el temporizador cuando cambia el valor de "done"*/
  return(
  /* <li className={classNames('wish-list__item',{'wish-list__item--done': done})}> */
    <li className={classNames('wish-list__item', {'wish-list__item--done': done,'wish-list__item--warning': age >= 5 && age < 10,'wish-list__item--danger': age >= 10,})}>
    <label htmlFor={id}>{texto}</label>
    <input type="checkbox" checked={done} id="{id}" onChange={event=>{onDoneChange(event.target.checked)}}/>
    </li>
);};

WishItem.propTypes = {
  done: PropTypes.bool,
  texto: PropTypes.string,
  id: PropTypes.string,
  onDoneChange: PropTypes.func,
};

WishItem.defaultProps = {
  done: false,
  texto: '',
  id: '',
  onDoneChange: () => {},
};

export default WishItem;
