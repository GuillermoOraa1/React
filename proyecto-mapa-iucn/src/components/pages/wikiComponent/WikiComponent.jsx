import React, { useState } from "react";

const WikiComponent = ({ scientificName }) => {
    const [exists, setExists] = useState(false);
    const decomposedScientificName=scientificName.split(" ");
    const recomposedScientificName=decomposedScientificName[0].concat("_",decomposedScientificName[1]);
    const urlWiki="https://es.wikipedia.org/wiki/"+recomposedScientificName;

    const verifyLink = async () => {
        try {
            const response = await fetch(urlWiki);
            setExists(response.ok);
        } catch (error) {
            console.error('Error:', error);
            setExists(false);
        }
    };

    return (
        <>
            {!exists && <a href={urlWiki} target="_blank" rel="noreferrer">{scientificName}</a>}
        </>
    );
};
export default WikiComponent;