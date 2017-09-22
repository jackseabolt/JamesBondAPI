const express = require('express'); 
const mongoose = require('mongoose'); 
const router = express.Router(); 
const Character = require('../models'); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 

router.get('/', (req, res) => {
    Character
        .find()
        .then(characters => {
            res.status(200).json(characters.map(char => char.apiRepr()))
        })
}); 

router.post('/', jsonParser, (req, res) => {
    newChar = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        age: req.body.age || undefined
    };
    Character
        .create(newChar)
        .then(character => {
            res.status(201).json(character.apiRepr()); 
        })
        .catch(err => console.log(err)); 
})

module.exports = router; 