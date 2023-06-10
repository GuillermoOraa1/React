import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './SpeciesHabitats.css';
import axios from 'axios';

const SpeciesHabitats = ({ speciesId }) => {
  const [habitats, setHabitats] = useState(null);
  const [habitatInfo, setHabitatInfo] = useState(null);
  const [isHabitatInfoOpen, setIsHabitatInfoOpen] = useState(false);

  useEffect(() => {
    const fetchHabitats = async () => {
      try {
        const response = await axios.get(
          `https://apiv3.iucnredlist.org/api/v3/habitats/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        setHabitats(response.data.result);
      } catch (error) {
        console.error('Error al obtener los hábitats:', error);
      }
    };

    const fetchHabitatInfo = async () => {
      try {
        const response = await axios.get(
          `http://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        setHabitatInfo(response.data.result[0].habitat);
      } catch (error) {
        console.error('Error al obtener la información del hábitat:', error);
      }
    };

    fetchHabitats();
    fetchHabitatInfo();
  }, [speciesId]);

  const toggleHabitatInfo = () => {
    setIsHabitatInfoOpen(!isHabitatInfoOpen);
  };

  if (!habitats || !habitatInfo) {
    return <div>Loading information...</div>;
  }

  return (
    <div>
      <h2>Habitat and Ecology</h2>
      <div className="population-line-red"></div>

      <div className="habitats-container">
        {habitats.map((habitat, index) => (
          <div key={index} className="habitat-item">
            {habitat.habitat}
          </div>
        ))}
      </div>
      <div className="population-line-gray"></div>

      <div className="habitat-info-container">
        <h2 className="habitat-title">
          <button onClick={toggleHabitatInfo}>{isHabitatInfoOpen ? '▲' : '▼'}</button> Habitat and Ecology in detail
        </h2>
        {isHabitatInfoOpen && (
          <div className="habitat-info">{parse(habitatInfo)}</div>
        )}
      </div>
    </div>
  );
};

export default SpeciesHabitats;
