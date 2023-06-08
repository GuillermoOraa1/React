import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import {Stack, ImageList, ImageListItem, ImageListItemBar, Collapse, Grow} from '@mui/material';
import {AveCollection,InsectsCollection} from './ImportedImages';
//import blackRibbon from '../../assets/images/extincts/blackRibbon.png'
import './extinctList.css';

const ExtinctList =({focus})=>{

    const { pathname } = useLocation();
    const [randomImages, setRandomImages] = useState([]);

    const selectRandomImages=(collection)=>{
        var AnimalList=collection.sort(function(){return Math.random()-0.5});
        return AnimalList.slice(0,4);
    }
    
    useEffect(() => {
        if(focus===true)setRandomImages(selectRandomImages(InsectsCollection));
    },[focus]); 
    

    return(
        <div className='extinctList-container' style={{ display: pathname !== '/' ? 'none' : 'block' }}>
            {/* {focus && <p>Some friends lost in the way</p>}    */}
            {/* <button onClick={handleChange}>Cambiar</button> */}
            <Collapse in={focus} timeout={1000}>
                <h4 id="title">Some friends lost in the way</h4>
                <Stack spacing={4}>
                <Grow in={focus} timeout={2000}>
                <ImageList sx={{ width: "100%", paddingLeft:"40px", paddingRight:"40px" }} cols={4}>
                    {randomImages.map((ave) => (
                    <ImageListItem key={ave.nombre}>
                        <img src={ave.imagen} alt={ave.nombre} width="54px" height="154px" loading="lazy" objectFit="fill"/>
                        <ImageListItemBar title={ave.nombre} subtitle={`Extinghised in ${ave.year}`}/> 
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