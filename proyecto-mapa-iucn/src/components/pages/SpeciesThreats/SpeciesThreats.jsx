import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './SpeciesThreats.css';
import axios from 'axios';

const SpeciesThreats = ({ speciesId }) => {
  const [speciesThreats, setSpeciesThreats] = useState(null);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [threatInfo, setThreatInfo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThreatsInfoOpen, setThreatsInfoOpen] = useState(false);

  useEffect(() => {
    const fetchSpeciesThreats = async () => {
      try {
        const response = await axios.get(
          `https://apiv3.iucnredlist.org/api/v3/threats/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        setSpeciesThreats(response.data.result);
      } catch (error) {
        console.error('Error al obtener las amenazas:', error);
      }
    };
    const fetchThreatSelect = async () => {
      try {
        const response = await axios.get(
          `http://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        //console.log(response.data.result[0].threats); // Agregar esta línea
        setThreatInfo(response.data.result[0].threats);
      } catch (error) {
        console.error('Error al obtener la información de amenaza:', error);
      }
    };

    fetchThreatSelect();
    fetchSpeciesThreats();
  }, [speciesId]);
  const toggleThreatsInfo = () => {
    setThreatsInfoOpen(!isThreatsInfoOpen);
  }

  const handleThreatSelect = async (speciesId) => {
        try {
          const response = await axios.get(
            `http://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
          );
          setSelectedThreat(response.data.result[0].threat);
        } catch (error) {
          console.error('Error al obtener la información de amenaza:', error);
        }
      };
 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!speciesThreats) {
    return <div className="species-threats">Loading information...</div>;
  }

  if (speciesThreats.length === 0) {
    return (
      <div className="species-threats">
        No threat information found for this species.
      </div>
    );
  }

  const threatsToShow = speciesThreats.slice(0, 3);

  return (
    <div className="species-threats">
      <h2>Threats</h2>
      <div className="population-line-red"></div>
      <div className="threats-container">
        {threatsToShow.map((threat, index) => (
          <div key={index} className="threat-item">
            <p onClick={() => handleThreatSelect(threat.speciesId)}>{threat.title}</p>
          </div>
        ))}
      </div>
      {selectedThreat && (
        <div className="selected-threat">
          <h3>{selectedThreat.title}</h3>
          <div className="threat-details">{selectedThreat.description}</div>
        </div>
      )}
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={toggleDropdown}>
          {isDropdownOpen ? '▲' : '▼'} More Threats
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            {speciesThreats.slice(3).map((threat, index) => (
              <div key={index} className="dropdown-item">
                <p onClick={() => handleThreatSelect(threat.speciesId)}>{threat.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="population-line-gray"></div>
        
      <div className="habitat-info-container">
        <h2 className="habitat-title">
          <button onClick={toggleThreatsInfo}>{isThreatsInfoOpen ? '▲' : '▼'}</button> Threats in detail
        </h2>
        {isThreatsInfoOpen && (
          <div className="habitat-info">{threatInfo? parse(JSON.stringify(threatInfo)):'We dont have enough data.'}</div>
        )}
      </div>
    </div>
  );
};

export default SpeciesThreats;



// import React, { useState, useEffect } from 'react';
// import parse from 'html-react-parser';
// import './SpeciesThreats.css';
// import axios from 'axios';

// const SpeciesThreats = ({ speciesId }) => {
//   const [speciesThreats, setSpeciesThreats] = useState(null);
//   const [selectedThreat, setSelectedThreat] = useState(null);
//   const [threatInfo, setThreatInfo] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isThreatsInfoOpen, setThreatsInfoOpen] = useState(false);

//   useEffect(() => {
//     const fetchSpeciesThreats = async () => {
//       try {
//         const response = await axios.get(
//           `https://apiv3.iucnredlist.org/api/v3/threats/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
//         );
//         setSpeciesThreats(response.data.result);
//       } catch (error) {
//         console.error('Error al obtener las amenazas:', error);
//       }
//     };

//     const fetchThreatSelect = async () => {
//       try {
//         const response = await axios.get(
//           `http://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
//         );
//         setThreatInfo(response.data.result[0].threats);
//       } catch (error) {
//         console.error('Error al obtener la información de amenaza:', error);
//       }
//     };

//     fetchThreatSelect();
//     fetchSpeciesThreats();
//   }, [speciesId]);

//   const toggleThreatsInfo = () => {
//     setThreatsInfoOpen(!isThreatsInfoOpen);
//   };

//   const handleThreatSelect = async (speciesId) => {
//     try {
//       const response = await axios.get(
//         `http://apiv3.iucnredlist.org/api/v3/species/narrative/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
//       );
//       setSelectedThreat(response.data.result[0].threat);
//     } catch (error) {
//       console.error('Error al obtener la información de amenaza:', error);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   if (!speciesThreats) {
//     return <div className="species-threats">Loading information...</div>;
//   }

//   if (speciesThreats.length === 0) {
//     return (
//       <div className="species-threats">
//         No threat information found for this species.
//       </div>
//     );
//   }

//   const threatsToShow = speciesThreats.slice(0, 3);

//   return (
//     <div className="species-threats">
//       <h2>Threats</h2>
//       <div className="population-line-red"></div>
//       <div className="threats-container">
//         {threatsToShow.map((threat, index) => (
//           <div key={index} className="threat-item">
//             <p
//               className="threatstoshow"
//               onClick
//               ={() => handleThreatSelect(threat.speciesId)}
//             >
//               {threat.title}
//             </p>
//           </div>
//         ))}
//       </div>
//       {selectedThreat && (
//         <div className="selected-threat">
//           <h3>{selectedThreat.title}</h3>
//           <div className="threat-details">{selectedThreat.description}</div>
//         </div>
//       )}
//       <div className="dropdown-container">
//         <button className="dropdown-button" onClick={toggleDropdown}>
//           {isDropdownOpen ? '▲' : '▼'} More Threats
//         </button>
//         {isDropdownOpen && (
//           <div className="dropdown-content">
//             {speciesThreats.slice(3).map((threat, index) => (
//               <div key={index} className="dropdown-item">
//                 <p
//                   className="threatstoshow"
//                   onClick={() => handleThreatSelect(threat.speciesId)}
//                 >
//                   {threat.title}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="population-line-gray"></div>

//       <div className="habitat-info-container">
//         <h2 className="habitat-title">
//           <button onClick={toggleThreatsInfo}>
//             {isThreatsInfoOpen ? '▲' : '▼'}
//           </button>{' '}
//           Threats in detail
//         </h2>
//         {isThreatsInfoOpen && (
//           <div className="habitat-info">
//             {threatInfo
//               ? parse(JSON.stringify(threatInfo))
//               : 'We dont have enough data.'}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpeciesThreats;
