var express = require('express');
let animalSchema= require('../models/animals');
var app = express();
app.use(express.json());

app.get('/:CommonName/:ScientificName', async(req, res) => {

    try{
        let animal=new animalSchema();
        animal.name=req.params.CommonName;
        animal.scientificName=req.params.ScientificName;
        const recoveredAnimal=await animalSchema.findOne({ name:animal.name })
        if (!recoveredAnimal) {
            animal.save();
            res.status(200).json({ success: true});
        }
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
});


app.get('/:CommonName', async (req, res) => {
    try {
        let commonName = req.params.CommonName;
        const nombres = await animalSchema.find({name:{ $regex: '.*' + commonName + '.*' }});
        res.status(200).json({ success: true, data: nombres });
    } catch (err) {
        res.status(500).json({ success: false, message: 'We dont have any record with that name.' });
    }
});

module.exports = app;