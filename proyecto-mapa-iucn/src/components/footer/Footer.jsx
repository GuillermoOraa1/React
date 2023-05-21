import facebookIcon from  "../../assets/icons/RRSS/facebook.png";
import instagramIcon from  "../../assets/icons/RRSS/instagram.png";
import twitterIcon from  "../../assets/icons/RRSS/twitter.png";
import './Footer.css';

const footer =()=>{
    return(
        <>
            <div className="content">
                <div className="description">
                    <p>IUCN 2023. The IUCN Red List of Threatened Species. Version 2022-2. ISSN 2307-8235</p>
                    <p>© International Union for Conservation of Nature and Natural Resources.</p>
		    <p>This website use images extracted from Google Images</p>
                    <p>This website was made possible through generous support from: IES Lope de Vega , Synchronicity Earth</p>
                    <p><a href="https://www.iucnredlist.org/policy/privacy-policy">Privacy and security</a></p>
                </div>
                <div className="rrss">
                    <p>FOLLOW US</p>
                    <div className="rrss-icons">
                        <a href="https://www.facebook.com/IUCNRedList/" target="_blank" rel="noreferrer"><img src={facebookIcon} alt="Facebook icon" width="40px" height="40px"/></a>
                        <a href="https://twitter.com/iucnredlist" target="_blank" rel="noreferrer"><img src={twitterIcon} alt="Facebook icon" width="40px" height="40px"/></a>
                        <a href="https://www.instagram.com/redlist_of_ecosystems/?hl=es" target="_blank" rel="noreferrer"><img src={instagramIcon} alt="Facebook icon" width="40px" height="40px"/></a>
                    </div>

                </div>
            </div>
        </>
    );
}

export default footer;