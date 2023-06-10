import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import {Stack, ImageList, ImageListItem, ImageListItemBar, Collapse, Grow} from '@mui/material';
import {AveCollection,InsectsCollection,MammalsCollection,AmphibiansCollection,ReptileCollection,FishesCollection} from './ImportedImages';
//import blackRibbon from '../../assets/images/extincts/blackRibbon.png'
import './extinctList.css';

const ExtinctList =({focus, family})=>{

    const { pathname } = useLocation();
    const [randomImages, setRandomImages] = useState([]);

    const selectRandomImages=(collection)=>{
        var AnimalList=collection.sort(function(){return Math.random()-0.5});
        return AnimalList.slice(0,4);
    }
    
    useEffect(() => {
        if(focus===true){
            if(family==='insects')setRandomImages(selectRandomImages(InsectsCollection));
            if(family==='aves')setRandomImages(selectRandomImages(AveCollection));
            if(family==='amphibians')setRandomImages(selectRandomImages(AmphibiansCollection));
            if(family==='mammals')setRandomImages(selectRandomImages(MammalsCollection));
            if(family==='reptiles')setRandomImages(selectRandomImages(ReptileCollection));
            if(family==='fishes')setRandomImages(selectRandomImages(FishesCollection));
        }
        
    },[focus, family]); 
    

    return(
        <div className='extinctList-container' style={{ display: pathname !== '/' ? 'none' : 'block' }}>
            <Collapse in={focus} timeout={1000}>
                <h4 id="title">Some friends lost in the way</h4>
                <Stack spacing={4}>
                <Grow in={focus} timeout={2000}>
                <ImageList sx={{ width: "100%", paddingLeft:"40px", paddingRight:"40px" }} cols={4}>
                    {randomImages.map((animal) => (
                    <ImageListItem key={animal.nombre}>
                        <img src={animal.image} alt={animal.name} width="54px" height="154px" loading="lazy" objectFit="fill"/>
                        <ImageListItemBar title={animal.name} subtitle={`Extinghised in ${animal.year}`}/> 
                    </ImageListItem>
                    ))}
                </ImageList>
                </Grow>
                </Stack>
            </Collapse>
        </div>
    );
}
    
export default ExtinctList;