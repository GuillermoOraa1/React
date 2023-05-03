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
                <img src={IUCNlogo} alt="IUCN logo" width="160px" height="160px" />
            </div>
            <div className="text">
                <div className="title">
                    <h1>The IUCN Red List of Threatened Species</h1>
                </div>
                <div className="listOfSpecies">
                    <div className="listOfSpecies-text">
                        <h3>More than 42,100 species are threatened with extinction.</h3>
                        <h4>That is still 28% of all assessed species.</h4>
                    </div>
                    <div className="listOfSpecies-icons">
                        <p>Amphibians <span><strong>41%</strong> <img src={amphibiansImage} alt="Amphibians icon" /></span></p>
                        <p>Mammals <span><strong>27%</strong> <img src={mammalsImage} alt="Mammals icon"  /></span></p>
                        <p>Birds <span><strong>13%</strong> <img src={birdsImage} alt="Birds icon"  /></span></p>
                        <p>Reptiles <span><strong>21%</strong> <img src={reptilesImage} alt="Reptiles icon" /></span></p>
                        <p>Fishes <span><strong>55%</strong> <img src={fishesImage} alt="Fishes icon" /></span></p>
                        <p>Insects <span><strong>40%</strong> <img src={insectsImage} alt="Insects icon" /></span></p> 
                    </div>
                </div>
            </div>

            

        </div>
    );
}

export default header;