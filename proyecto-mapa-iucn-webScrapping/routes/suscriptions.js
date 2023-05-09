var express = require('express');
var app = express.Router();

app.post("/", async (req, res) => {

  const MJ_APIKEY_PUBLIC='f7a997c121afca2a540be25c86575610';
  const MJ_APIKEY_PRIVATE='7e2c466bb9e523908bc14d2dcbb56da4';
  const mailjet = require ('node-mailjet').connect(MJ_APIKEY_PUBLIC,MJ_APIKEY_PRIVATE)
  const { name, email} = req.body;
  
  try {
    const request = await mailjet
        .post("contactslist", {'version': 'v3'})
        .id(10307173)
        .action("managecontact")
        .request({
            "Name":name,
            "Properties":"",
            "Action":"addnoforce",
            "Email":email
            });
    //console.log(request.body);
    res.status(200).json({ success: true, message: "Contact added to list successfully!" });
  }catch (error) {
    console.error("Error adding contact to list:", error);
    res.status(500).json({ success: false, message: "An error occurred while adding contact to list." });
  }
});   

module.exports = app;