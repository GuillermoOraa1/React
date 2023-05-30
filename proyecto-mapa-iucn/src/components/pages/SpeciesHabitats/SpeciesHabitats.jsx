import React, { useState, useEffect } from 'react';
import './SpeciesHabitats.css';
import axios from 'axios';

const SpeciesHabitats = ({ speciesId }) => {
  const [habitats, setHabitats] = useState(null);
  console.log("xxx"+speciesId);
  useEffect(() => {
    const fetchHabitats = async () => {
      const response = await axios.get(
        `https://apiv3.iucnredlist.org/api/v3/habitats/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
      );
      setHabitats(response.data.result);
    };

    fetchHabitats();
  }, [speciesId]);

  if (!habitats) {
    return <div>Cargando información...</div>;
  }

  return (
    <div>
      <h2>Habitats</h2>
      {habitats.map((habitat, index) => (
        <p key={index}>{habitat.habitat}</p>
      ))}
    </div>
  );
};

export default SpeciesHabitats;
