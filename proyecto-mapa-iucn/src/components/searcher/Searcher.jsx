import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
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
        <>
            <form action="" onSubmit={searchAnimal}>
                <input type="text" name="scientific_name" id="Scientific_name" />
                <input type="submit" value="Search"/>
            </form>
            {taxonid==="Error" && (<p>We dont have any record of this species </p>)}
        </>
    );
}

export default Searcher;