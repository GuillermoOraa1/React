import iucn from './../../assets/images/partnerships/iucn.png';
import ssc from './../../assets/images/partnerships/ssc.png';
import abq from './../../assets/images/partnerships/biopark_logo_4c_square.png';
import asu from './../../assets/images/partnerships/asu.png';
import birdLife from './../../assets/images/partnerships/bird.png';
import bcgi from './../../assets/images/partnerships/bgci.png';
import ci from './../../assets/images/partnerships/CI.png';
import missouri from './../../assets/images/partnerships/Missouri_Botanical_Garden_Square_Green_transparent.png';
import natureServe from './../../assets/images/partnerships/NatureServe_new_logo_H_color.png';
import rewild from './../../assets/images/partnerships/Rewild_Logo_Primary_small.png';
import kew from './../../assets/images/partnerships/kew.png';
import sapienza from './../../assets/images/partnerships/sapienza.png';
import zsl from './../../assets/images/partnerships/ZSL_Stacked_RGB_trans.png';
import texas from './../../assets/images/partnerships/tamu.png';
import './Partnership.css';

const partnership =()=>{
    return(
        <>
            <p className='partnershipTitle'>THE RED LIST PARTNERSHIP</p>
            <div className='partnership'>
                <div className='partner'><a href="https://www.iucn.org/" target='_blank' rel="noreferrer"><img src={iucn} alt="logo IUCN" width="65px"/></a></div>
                <div className='partner'><a href="https://www.iucn.org/our-union/commissions/species-survival-commission" target='_blank' rel="noreferrer"><img src={ssc} alt="logo Species Survival Commision" width="100px"/></a></div>
                <div className='partner'><a href="https://www.cabq.gov/artsculture/biopark" target='_blank' rel="noreferrer"><img src={abq} alt="logo ABQ Biopark" width="60px"/></a></div>
                <div className='partner'><a href="https://www.asu.edu/" target='_blank' rel="noreferrer"><img src={asu} alt="logo ASU" width="70px"/></a></div>
                <div className='partner'><a href="https://www.birdlife.org/" target='_blank' rel="noreferrer"><img src={birdLife} alt="logo BirdLife International" width="100px"/></a></div>
                <div className='partner'><a href="https://www.bgci.org/" target='_blank' rel="noreferrer"><img src={bcgi} alt="logo BGCI" width="60px"/></a></div>
                <div className='partner'><a href="https://www.conservation.org/" target='_blank' rel="noreferrer"><img src={ci} alt="logo Conservation International" width="110px"/></a></div>
                <div className='partner'><a href="https://www.missouribotanicalgarden.org/" target='_blank' rel="noreferrer"><img src={missouri} alt="logo Missouri Botanical Garden" width="90px"/></a></div>
                <div className='partner'><a href="https://www.natureserve.org/" target='_blank' rel="noreferrer"><img src={natureServe} alt="logo Nature Serve" width="120px"/></a></div>
                <div className='partner'><a href="https://www.rewild.org/" target='_blank' rel="noreferrer"><img src={rewild} alt="logo re:wild" width="140px"/></a></div>
                <div className='partner'><a href="https://www.kew.org/" target='_blank' rel="noreferrer"><img src={kew} alt="logo KEW" width="120px"/></a></div>
                <div className='partner'><a href="https://www.uniroma1.it/it/" target='_blank' rel="noreferrer"><img src={sapienza} alt="logo Sapienza University" width="140px"/></a></div>
                <div className='partner'><a href="https://www.zsl.org/" target='_blank' rel="noreferrer"><img src={zsl} alt="logo Zoological Society of London" width="70px"/></a></div>
                <div className='partner'><a href="https://www.tamu.edu/" target='_blank' rel="noreferrer"><img src={texas} alt="logo Texas University" width="160px"/></a></div>
            </div>
        </>

    );
}

export default partnership;