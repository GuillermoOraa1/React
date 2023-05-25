import React, { useState,useEffect } from "react";

const WikiComponent = ({ scientificName }) => {
    const [exists, setExists] = useState(false);
    const decomposedScientificName=scientificName.split(" ");
    const recomposedScientificName=decomposedScientificName[0].concat("_",decomposedScientificName[1]);
    const urlWiki="https://es.wikipedia.org/wiki/"+recomposedScientificName;

    useEffect(() => {
        fetch(urlWiki,{mode: 'no-cors',})
        .then((response) => {
            console.log(response.ok);
            if(response.ok){
                setExists(false);
            } else {
                setExists(true);
            }
        });
      }, [scientificName]);
    

    return (
        <>
            {exists && <p>Enlace de Wikipedia: <a href={urlWiki} target="_blank" rel="noreferrer">{scientificName}</a></p>}
        </>
    );
};


export default WikiComponent;