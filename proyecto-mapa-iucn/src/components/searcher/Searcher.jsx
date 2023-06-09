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

    var speciesList=[];
    
    const captureContent = async() => {
        var name=document.getElementById("common_name").value;
        if(name==="")document.getElementById("autocomplete-container").innerHTML="";
        if(name.length>3){
            fetch(`http://localhost:8000/animals/${name}`)
            .then((res) => res.json())
            .then((datos) => {
                const{data}=datos;
                document.getElementById("autocomplete-container").innerHTML="";
                const listBeforePurge=[];
                data.forEach(item => {
                    listBeforePurge.push(item.name);
                });
                const dataArr = new Set(listBeforePurge);
                speciesList=[...dataArr];
                speciesList.forEach(item => {
                    let inputName = document.createElement("input");
                    inputName.setAttribute('type', 'text');
                    inputName.setAttribute('class', 'searcher-input-in-container');
                    inputName.setAttribute('value', item);
                    var parent = document.getElementById("autocomplete-container");
                    parent.appendChild(inputName);
                });
                console.log(data);
                
                if(data[0].scientificName && data.length===1){
                    document.getElementById("autocomplete-container").innerHTML="";
                    document.getElementById("scientific_name_received").value=data[0].scientificName;
                    console.log(data[0].scientificName);
                    document.getElementById("common_name_received").value=data[0].name;
                    
                }  
            });
        }   
    };

    const searchAnimal = async(event) => {
        document.getElementById("autocomplete-container").innerHTML="";
        setTaxonid('');
        event.preventDefault();
        const scientific_name_received=document.getElementById("scientific_name_received").value;
        const common_name_received=document.getElementById("common_name_received").value;
        const name_writed=document.getElementById("common_name").value;
        document.getElementById("common_name").value="";
        if(common_name_received===name_writed && name_writed!==""){
            const scientific_name=scientific_name_received.replace(" ", "%20").toLowerCase();
            var url="http://apiv3.iucnredlist.org/api/v3/species/"+scientific_name+"?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee";    
            try{
                const response = await fetch(url);
                const data = await response.json();
                const {result}=data;
                changeTaxonid(result[0].taxonid);
                changeName(scientific_name_received);
                setTaxonid("Success");
                navigate("/search");
            }catch(error){
                setTaxonid("Error");
            }
        }else{
            const scientificName_received=document.getElementById("common_name").value;
            if(scientificName_received!==""){
                const scientific_name2=scientificName_received.replace(" ", "%20").toLowerCase();
                var url_scientific_name="http://apiv3.iucnredlist.org/api/v3/species/"+scientific_name2+"?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee";
                try{
                    const response = await fetch(url_scientific_name);
                    //if(response.status>=400) throw new Error('Something went wrong');
                    const data = await response.json();
                    const {result}=data;
                    changeTaxonid(result[0].taxonid);
                    changeName(scientificName_received);
                    setTaxonid("Success");
                    navigate("/search");
                }catch(error){
                    setTaxonid("Error");
                }
            }else {setTaxonid("Error");}
        }
    }
    

    return(
        <div className='container-searcher'>
            <img className="smell-image" src={leftFox} alt="wolf" />
            <div className="searcher">
              <h5>Look for any species using its scientific name.</h5>
              <form action="" onSubmit={searchAnimal}>
                <input className="searcher-input" type="hidden" id="common_name_received" size="35"/>
                <input className="searcher-input" type="hidden" id="scientific_name_received" size="35"/>
                <div className="input-container">
                    <input className="searcher-input" type="text" name="scientific_name" id="common_name" size="35" onChange={captureContent}/>
                    <div id="autocomplete-container"></div>
                </div>
                <button type="submit" className="searcher-button"><img src={iconSearch} alt="icon search" width="30px" height="22px"/></button>
                
              </form>
              {taxonid==="Error" && (<p className="searcher-message">We dont have any record of this species. Try with the scientific name</p>)}
            </div>
            <img className="smell-image" src={rightnutria} alt="wolf" />
        </div>
    );
}

export default Searcher;