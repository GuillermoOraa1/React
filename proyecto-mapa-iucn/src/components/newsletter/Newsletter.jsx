import React, { useState } from "react";

const NewsletterForm=()=>{

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const enviarSuscripción=(event)=>{
      event.preventDefault();
      //console.log("Hola2");
        fetch("http://localhost:8000/suscription/",{
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email}),
      })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Email contact add successfully!")
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setMessage("An error occurred while sending the info.")
      });  
  } 
    
    return (
        <>
          <form onSubmit={enviarSuscripción}>
            <label>Name:<input id="nombreNewsletter" type="text" value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>Email:<input id="emailNewsletter" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            <button type="submit">Send</button>
            <p>{message}</p>
        </form>
        </>
    );
}
export default NewsletterForm;