'use strict';

const express = require('express'); 
const bodyParser = require('body-parser'); 
const { User } = require('../models/userModel');
const router = express.Router(); 
const jsonParser = bodyParser.json(); 

router.post('/', jsonParser, (req, res) => {
    let { username, password } = req.body; 
    return User.find({ username })
        .count()
        .then(count => {
            if( count > 0 ){
                return Promise.reject({
                    code: 422, 
                    reason: 'ValidationError', 
                    message: 'Username already taken', 
                    location: 'username'
                }); 
            }
            return User.hashPassword(password); 
        })
        .then(hash => {
            return User.create({ username, password: hash })
        })
        .then(user => {
            return res.status(201).json(user.apiRepr()); 
        })
        .catch(err => {
            if(err.reason === 'ValidationError'){
                return res.status(err.code).json(err); 
            }
            res.status(500).json({ code: 500, message: 'Internal Server Error'})
        })
}); 


router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users)); 
}); 

module.exports = router; 