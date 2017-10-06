const express = require('express'); 
const mongoose = require('mongoose'); 
const passport = require('passport'); 
const router = express.Router(); 
const Character = require('../models'); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 

const jwtAuth = passport.authenticate('jwt', {session: false}); 

router.get('/', (req, res) => {
    Character
        .find()
        .then(characters => {
            res.status(200).json(characters.map(char => char.apiRepr())); 
        })
}); 

router.post('/', jsonParser, jwtAuth, (req, res) => {
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

router.put('/:id', jsonParser, jwtAuth, (req, res) => {
    updatedChar = {};
    const updatableFields = ['firstName', 'lastName', 'age']; 
    updatableFields.forEach(field => {
        if(field in req.body){
            updatedChar[field] = req.body[field];
        }
    });
    Character
        .findByIdAndUpdate(req.params.id, {$set: updatedChar})
        .then(char => res.status(204).json(res.body))
        .catch(err => console.error(err)); 
})

router.delete('/:id', jwtAuth, (req, res) => {
    Character
        .findByIdAndRemove(req.params.id)
        .then(
            res.status(200).json({message: 'Item deleted'})
        )
})

module.exports = router; 