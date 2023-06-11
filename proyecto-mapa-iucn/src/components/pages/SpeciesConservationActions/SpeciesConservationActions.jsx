import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './SpeciesConservationActions.css';
import axios from 'axios';

const SpeciesConservationActions = ({ speciesId }) => {
  const [conservationActions, setConservationActions] = useState(null);
  const [conservationMeasures, setConservationMeasures] = useState(null);
  const [isConservationInfoOpen, setIsConservationInfoOpen] = useState(false);

  useEffect(() => {
    const fetchConservationActions = async () => {
      const response = await axios.get(
        `https://apiv3.iucnredlist.org/api/v3/measures/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
      );
      setConservationActions(response.data.result);
    };

    const fetchConservationMeasures = async () => {
      const response = await axios.get(
        `http://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
      );
      setConservationMeasures(response.data.result[0]?.conservationmeasures);
    };

    fetchConservationActions();
    fetchConservationMeasures();
  }, [speciesId]);
  const toggleConservationInfo = () => {
    setIsConservationInfoOpen(!isConservationInfoOpen);
  }

  if (!conservationActions || !conservationMeasures) {
    return <div>Loading information...</div>;
  }

  const sortConservationActions = (actions) => {
    const sortedActions = actions.sort((a, b) => {
      const codeA = a.code.split('.');
      const codeB = b.code.split('.');

      for (let i = 0; i < Math.max(codeA.length, codeB.length); i++) {
        const partA = parseInt(codeA[i]) || 0;
        const partB = parseInt(codeB[i]) || 0;

        if (partA !== partB) {
          return partA - partB;
        }
      }

      return codeA.length - codeB.length;
    });

    return sortedActions;
  };

  const sortedConservationActions = sortConservationActions(conservationActions);

return (
  <div>
    <h2>Conservation Actions Needed</h2>
    <div className="table-container">
    <div className="table-container">
  <table className="table">
    <thead>
      <tr>
        <th>CODE</th>
        <th>NOTES</th>
      </tr>
    </thead>
    <tbody>
      {sortedConservationActions.map((action, index) => (
        <tr key={index}>
          <td>{action.code}</td>
          <td>{action.title}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>

    <div className="convervation-info-container">
      <h3 className="conservation-title">
        <button onClick={toggleConservationInfo}>
          {isConservationInfoOpen ? '▲' : '▼'}
        </button>
        Conservation Actions in detail
      </h3>
      {isConservationInfoOpen && (
        <div className="conservation-info">{parse(conservationMeasures)}</div>
      )}
    </div>
  </div>
);

};

export default SpeciesConservationActions;
