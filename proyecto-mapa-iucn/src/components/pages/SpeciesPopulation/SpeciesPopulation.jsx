
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './SpeciesPopulation.css';

// const SpeciesPopulation = ({ speciesId }) => {
//   const [loading, setLoading] = useState(false);
//   const [populationInfo, setPopulationInfo] = useState(null);
//   const [populationTrend, setPopulationTrend] = useState(null);
//   const [isPopulationInfoOpen, setIsPopulationInfoOpen] = useState(false);

//   useEffect(() => {
//     const fetchPopulationInfo = async () => {
//       try {
//         const response = await axios.get(
//           `https://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
//         );
//         console.log(`http://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`);
//         setPopulationInfo(response.data.result[0].population);
//         setPopulationTrend(response.data.result[0].populationtrend);
//         setLoading(true);
//       } catch (error) {
        
//         console.error('Error al obtener los datos:', error);
//         setLoading(true);
//       }
//     };

//     fetchPopulationInfo();
//   }, [speciesId]);

//   const togglePopulationInfo = () => {
//     setIsPopulationInfoOpen(!isPopulationInfoOpen);
//   };

//   const formatPopulationInfo = (text) => {
//     if (text) {
//       const firstLetter = text.charAt(0).toUpperCase();
//       const formattedText = firstLetter + text.slice(1);
//       return formattedText;
//     }
//     return '';
//   };

//   return (
//     <>
//       {!loading && <div>Loading information...</div>}
//       {loading && (
//         <div>
//           <div className="population-header">
//             <h2>Population</h2>
//             <div className="population-icon"></div>
//           </div>
//           <div className="population-line-red"></div>
//           <h3>CURRENT POPULATION TREND</h3>
          
//           {populationTrend ? (
//             <div className="population-trend" dangerouslySetInnerHTML={{ __html: formatPopulationInfo(populationTrend) }} />
//           ) : (
//             <div>No population trend information available</div>
//           )}

//           <div className="population-line-gray"></div>

//           <h2 className="population-title" onClick={togglePopulationInfo}>
//             <button>{isPopulationInfoOpen ? '▲' : '▼'}</button> Population in detail
//           </h2>
          
//           {isPopulationInfoOpen && populationInfo ? (  
//             <>
//               <h4>Description</h4>
//               <div className="population-info"  dangerouslySetInnerHTML={{ __html: formatPopulationInfo(populationInfo) }} />
//             </>
//           ) : (
//             <>
//               {isPopulationInfoOpen && <div className="no-info">No population information available</div>}
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default SpeciesPopulation;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import './SpeciesPopulation.css';

const SpeciesPopulation = ({ speciesId }) => {
  const [loading, setLoading] = useState(false);
  const [populationInfo, setPopulationInfo] = useState(null);
  const [populationTrend, setPopulationTrend] = useState(null);
  const [isPopulationInfoOpen, setIsPopulationInfoOpen] = useState(false);

  useEffect(() => {
    const fetchPopulationInfo = async () => {
      try {
        const response = await axios.get(
          `https://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        setPopulationInfo(response.data.result[0].population);
        setPopulationTrend(response.data.result[0].populationtrend);
        setLoading(true);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(true);
      }
    };

    fetchPopulationInfo();
  }, [speciesId]);

  const togglePopulationInfo = () => {
    setIsPopulationInfoOpen(!isPopulationInfoOpen);
  };

  const formatPopulationInfo = (text, isTrend = false) => {
    if (text) {
      const formattedText = isTrend ? text.toUpperCase() : text;
      return parse(formattedText);
    }
    return '';
  };

  return (
    <>
      {!loading && <div>Loading information...</div>}
      {loading && (
        <div>
          <div className="population-header">
            <h2>Population</h2>
            <div className="population-icon"></div>
          </div>
          <div className="population-line-red"></div>
          <h3>CURRENT POPULATION TREND</h3>

          {populationTrend ? (
            <div className="population-trend">
              <span className="trend-info">{formatPopulationInfo(populationTrend, true)}</span>
            </div>
          ) : (
            <div>No population trend information available</div>
          )}

          <div className="population-line-gray"></div>

          <h2 className="population-title" onClick={togglePopulationInfo}>
            <button>{isPopulationInfoOpen ? '▲' : '▼'}</button> Population in detail
          </h2>

          {isPopulationInfoOpen && populationInfo ? (
            <>
              <h4>Description</h4>
              <div className="population-info">{formatPopulationInfo(populationInfo)}</div>
            </>
          ) : (
            <>
              {isPopulationInfoOpen && <div className="no-info">No population information available</div>}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SpeciesPopulation;
