import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
//import rightHamster from "../../assets/images/searcher/hamster.PNG";
import rightnutria from "../../assets/images/searcher/nutria.PNG";
import leftFox from "../../assets/images/searcher/fox.PNG";
import iconSearch from "../../assets/images/searcher/searcher_icon.png";
import './Searcher.css';

const Searcher =({changeTaxonid,changeName})=>{

    const [taxonid, setTaxonid]=useState('');
    const navigate = useNavigate();
    

    const searchAnimal = async(event) => {
        setTaxonid('');
        event.preventDefault();
        const name_received=document.getElementById("Scientific_name").value;
        if(name_received!==""){
            const scientific_name=name_received.replace(" ", "%20").toLowerCase();
            var url="http://apiv3.iucnredlist.org/api/v3/species/"+scientific_name+"?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee"
            
            try{
                const response = await fetch(url);
                //if(response.status>=400) throw new Error('Something went wrong');
                const data = await response.json();
                const {result}=data;
                changeTaxonid(result[0].taxonid);
                changeName(name_received);
                setTaxonid("Success");
                navigate("/search");
            }catch(error){
                setTaxonid("Error");
            }
        }else{
            setTaxonid("Error");
        }
    }
    

    return(
        <div className='container-searcher'>
            <img className="smell-image" src={leftFox} alt="wolf" />
            <div className="searcher">
              <h5>Look for any species using its scientific name.</h5>
              <form action="" onSubmit={searchAnimal}>
                <input className="searcher-input" type="text" name="scientific_name" id="Scientific_name" size="35" />
                <button type="submit" className="searcher-button"><img src={iconSearch} alt="icon search" width="30px" height="22px"/></button>
              </form>
              {taxonid==="Error" && (<p className="searcher-message">We dont have any record of this species </p>)}
            </div>
            <img className="smell-image" src={rightnutria} alt="wolf" />
        </div>
    );
}

export default Searcher;