import React, { useState, useEffect } from 'react';
import './SpeciesThreats.css';
import axios from 'axios';

const SpeciesThreats = ({ speciesId }) => {
  const [speciesThreats, setSpeciesThreats] = useState(null);

  useEffect(() => {
    const fetchSpeciesThreats = async () => {
      const response = await axios.get(
        `https://apiv3.iucnredlist.org/api/v3/threats/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
      );
      setSpeciesThreats(response.data.result);
    };

    fetchSpeciesThreats();
  }, [speciesId]);

  if (!speciesThreats) {
    return <div className="species-threats">Cargando información...</div>;
  }

  return (
    <div className="species-threats">
      <h2>Threats</h2>
      {speciesThreats.map((threat, index) => (
        <p key={index}>{threat.title}</p>
      ))}
    </div>
  );
};

export default SpeciesThreats;
