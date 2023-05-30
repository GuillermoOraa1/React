import React, { useState, useEffect } from 'react';
import './SpeciesConservationActions.css';
import axios from 'axios';

const SpeciesConservationActions = ({ speciesId }) => {
  const [conservationActions, setConservationActions] = useState(null);

  useEffect(() => {
    const fetchConservationActions = async () => {
      const response = await axios.get(
        `https://apiv3.iucnredlist.org/api/v3/measures/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
      );
      setConservationActions(response.data.result);
    };

    fetchConservationActions();
  }, [speciesId]);

  if (!conservationActions) {
    return <div>Cargando información...</div>;
  }

  return (
    <div>
      <h2>Acciones de Conservación</h2>
      {conservationActions.map((action, index) => (
        <p key={index}>{action.title}</p>
      ))}
    </div>
  );
};

export default SpeciesConservationActions;
