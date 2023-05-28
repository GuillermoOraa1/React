import IUCNlogo from "../../assets/images/IUCN_Red_List-2.png";
import amphibiansImage from "../../assets/icons/amphibians.svg";
import mammalsImage from "../../assets/icons/mammals.svg";
import birdsImage from "../../assets/icons/birds.svg";
import reptilesImage from "../../assets/icons/reptile.svg";
import fishesImage from "../../assets/icons/fishes.svg";
import insectsImage from "../../assets/icons/insects.svg";
import './Header.css';

const header =()=>{
    return(
        <div className="header">
            <div className="logo">
                <img src={IUCNlogo} alt="IUCN logo" width="200px" height="210px" />
            </div>
            
            <div className="text">
                <div className="title">
                    <img className="IUCN_logo_movil" src={IUCNlogo} alt="IUCN logo" width="80px" height="80px" />
                    <h1>The IUCN Red List of Threatened Species</h1>
                </div>
                <div className="listOfSpecies">
                    <div className="listOfSpecies-text">
                        <h4>More than 42,100 species are threatened with extinction.</h4>
                        <h4>That is still 28% of all assessed species.</h4>
                    </div>
                </div>

                <div className="listOfSpecies-icons">
                    <span><p>AMPHIBIANS <strong>41%</strong></p><img src={amphibiansImage} alt="Amphibians icon"  width="45px" height="55px"/></span>
                    <span><p>MAMMALS <strong>27%</strong></p><img src={mammalsImage} alt="Mammals icon"  width="70px" height="60px"/></span>
                    <span><p>BIRDS <strong>13%</strong></p><img src={birdsImage} alt="Birds icon"  width="60px" height="50px"/></span>
                    <span><p>REPTILES <strong>21%</strong></p><img src={reptilesImage} alt="Reptiles icon"  width="80px" height="60px"/></span>
                    <span><p>FISHES <strong>55%</strong></p><img src={fishesImage} alt="Fishes icon"  width="80px" height="60px"/></span>
                    <span><p>INSECTS <strong>40%</strong></p><img src={insectsImage} alt="Insects icon"  width="50px" height="50px"/></span> 
                </div>
            </div>



            

            

        </div>
    );
}

export default header;