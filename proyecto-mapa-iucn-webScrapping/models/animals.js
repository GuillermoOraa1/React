//import mongoose from "mongoose";
var mongoose = require('mongoose');
const animalSchema = new mongoose.Schema({
    name:{
        type: String
      },
      scientificName:{
        type: String, 
      },
});

animalSchema.methods.sameName=function(callback){
    this.model('Animal').find({name:this.name},callback);
}

const Animal = mongoose.model('animal', animalSchema);

module.exports = Animal;