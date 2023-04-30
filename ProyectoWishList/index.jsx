import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App/App.jsx';
// import States from './src/States/States';

const divRoot = ReactDOM.createRoot(document.getElementById('root'));
divRoot.render(<App />);

/* const divStates = ReactDOM.createRoot(document.getElementById('states'));
divStates.render(<States label="Mi texto" defChk="false" />); */
