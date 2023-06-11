import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './SpeciesSummary.css';
import axios from 'axios';

const SpeciesSummary = ({ speciesId }) => {
  const [loading, setLoading] = useState(false);
  const [speciesDescription, setSpeciesDescription] = useState(null);
  const [speciesDistribution, setSpeciesDistribution] = useState(null);
  const [isDistributionOpen, setIsDistributionOpen] = useState(false);

  useEffect(() => {
    const fetchSpeciesSummary = async () => {
      const response = await axios.get(
        `https://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
      );
      setSpeciesDescription(response.data.result[0].taxonomicnotes);
      setSpeciesDistribution(response.data.result[0].rationale);
      setLoading(true);
    };

    fetchSpeciesSummary();
  }, [speciesId]);

  const toggleDistribution = () => {
    setIsDistributionOpen(!isDistributionOpen);
  };

  return (
    <>
      {!loading && <div>Loading information...</div>}
      {loading && (
        <div>
          <h2>Description</h2>
          <div className="population-line-red"></div>
          {speciesDescription ? parse(speciesDescription) : 'We dont have enough data.'}
          <div className="population-line-gray"></div>

          <h2 className="population-info" >
            <button onClick={toggleDistribution}>{isDistributionOpen ? '▲' : '▼'}</button> Distribution
          </h2>
          {isDistributionOpen ? (
            <>
              {speciesDistribution  ? parse(speciesDistribution) : 'We dont have enough data.'}
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default SpeciesSummary;

