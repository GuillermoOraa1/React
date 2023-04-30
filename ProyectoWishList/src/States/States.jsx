import React, { useState } from 'react';

/* const TodoItem = ({label}) => {
    const[checked, setChecked]= useState(false);
    return (<p onClick={()=>setChecked(!checked)}>{checked? 'x' : 'v'} {label}</p>)
}; */

const TodoItem = ({label,defChk}) => {
    const[checked, setChecked]= useState(defChk);
    return (<p onClick={()=>setChecked(!checked)}>{checked? 'x' : 'v'} {label}</p>)
};

export default TodoItem;
