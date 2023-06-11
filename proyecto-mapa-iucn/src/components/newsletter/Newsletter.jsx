import React, { useState } from "react";
import leftParrot from "../../assets/images/newsletter/left-parrot.PNG";
import rightParrot from "../../assets/images/newsletter/right-parrot.PNG";
import iconMail from "../../assets/images/newsletter/mail_icon.png";
import './Newsletter.css';


const NewsletterForm=()=>{

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const enviarSuscripción=(event)=>{
      event.preventDefault();
      
        fetch("http://localhost:8000/suscription/",{
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email}),
      })
      .then((response) => {
        if(response.status>=400){
          setMessage("An error occurred while sending the info.");
        }else{
                  setMessage("Email contact add successfully!");
         document.getElementById("nombreNewsletter").value="";
         document.getElementById("emailNewsletter").value="";
        }
      
      })
  } 
    
    return (
      <div className="container-newsletter">
        <img className="parrot-image" src={leftParrot} alt="parrot" />
        <div className="newsletter">
          <h5>Sign up to our Newsletter and receive regular updates on our latest projects and activities.</h5>
          <form onSubmit={enviarSuscripción}>
            <label className="newsletter-label">Name:<input id="nombreNewsletter" type="text" value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label className="newsletter-label">Email:<input id="emailNewsletter" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            <button className="newsletter-button" type="submit"><img src={iconMail} alt="icon mail" width="30px" height="22px"/></button>
            <p className="newsletter-message">{message}</p>
          </form>
        </div>
        <img className="parrot-image" src={rightParrot} alt="parrot" />
      </div>

    );
}
export default NewsletterForm;