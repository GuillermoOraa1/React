var express = require('express');
var app = express.Router();
const {MJ_APIKEY_PUBLIC,MJ_APIKEY_PRIVATE}=require('../enviroment/env');
app.post("/", async (req, res) => {

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
    res.status(200).json({ success: true, message: "Contact added to list successfully!" });
  }catch (error) {
    console.error("Error adding contact to list:", error.message);
    res.status(500).json({ success: false, message: "An error occurred while adding contact to list." });
  }
});   

module.exports = app;