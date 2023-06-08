import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import CircularProgress from '@material-ui/core/';
//import Divider from '@material-ui/core/Divider';

import dd from '../../../assets/images/threatsLevels/dd.png';
import lc from '../../../assets/images/threatsLevels/lc.png';
import nt from '../../../assets/images/threatsLevels/nt.png';
import vu from '../../../assets/images/threatsLevels/vu.png';
import en from '../../../assets/images/threatsLevels/en.png';
import cr from '../../../assets/images/threatsLevels/cr.png';
import ew from '../../../assets/images/threatsLevels/ew.png';
import ex from '../../../assets/images/threatsLevels/ex.png';

import "./ImageTreatLevel.css";

const SpeciesImagen = ({ speciesId }) => {
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [citation, setCitation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apiv3.iucnredlist.org/api/v3/species/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        const { data } = response;
        const animalCategory = data.result[0].category;
        setCategory(animalCategory);
        setImageUrl(getImageForCategory(animalCategory));
        setLoading(false);
        
        const citationResponse = await axios.get(
          `https://apiv3.iucnredlist.org/api/v3/species/citation/id/${speciesId}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
        );
        const { data: citationData } = citationResponse;
        const animalCitation = citationData.result[0].citation;
        setCitation(animalCitation);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [speciesId]);

  const getImageForCategory = (category) => {
    switch (category) {
      case 'DD':
        return dd;
      case 'LC':
        return lc;
      case 'NT':
        return nt;
      case 'VU':
        return vu;
      case 'EN':
        return en;
      case 'CR':
        return cr;
      case 'EW':
        return ew;
      case 'EX':
        return ex;
      default:
        return '';
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <h2>Cargando datos...</h2>
          {/* <CircularProgress /> */}
        </div>
      ) : (
        <div>
          {/* <h2>{category}</h2> */}
          {category && <h2><strong>Status: </strong>{category}</h2>}
          {/* <Divider /> */}
          {citation && <p>{citation}</p>}
          {imageUrl && (
            <div className="image-container">
              <img src={imageUrl} alt={category} className="centered-image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpeciesImagen;