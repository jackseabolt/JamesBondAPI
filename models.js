'use strict'; 
const mongoose = require('mongoose'); 

const CharacterSchema = mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    age: {type: Number}, 
}); 

CharacterSchema.methods.apiRepr = function(){
    return {
        firstName: this.firstName, 
        lastName: this.lastName, 
        age: this.age || '', 
        id: this._id
    }
}

const Character = mongoose.model('Character', CharacterSchema); 

module.exports = Character

