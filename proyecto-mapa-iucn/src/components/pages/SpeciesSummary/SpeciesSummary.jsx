import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './SpeciesSummary.css';
import axios from 'axios';

const SpeciesSummary = ({ speciesId }) => {
  const [loading, setLoading] = useState(false);
  const [speciesDescription, setSpeciesDescription] = useState(null);
  const [speciesDistribution, setSpeciesDistribution] = useState(null);
  useEffect(() => {
    const fetchSpeciesSummary = async () => {
      const response = await axios.get(
        "https://apiv3.iucnredlist.org/api/v3/species/narrative/id/"+speciesId+"?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee"
      );
      setSpeciesDescription(response.data.result[0].taxonomicnotes);
      setSpeciesDistribution(response.data.result[0].rationale)
      setLoading(true);
    };

    fetchSpeciesSummary();
  }, [speciesId]);

  return (
    <>
    {(!loading) && <div>Cargando información...2</div>}
    {loading  &&(
      <div>
        <h2>Description</h2>
        {speciesDescription ? (parse(speciesDescription)):("We dont have enough data.")}
        <h2>Distribution</h2>
        {speciesDistribution ? (parse(speciesDistribution)):("We dont have enough data.")}
      </div>
    )}
    </>
  );
};

export default SpeciesSummary;
