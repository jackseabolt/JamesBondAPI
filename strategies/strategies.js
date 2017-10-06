'use strict'; 

const { BasicStrategy } = require('passport-http'); 
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../models/userModel'); 
const { JWT_SECRET } = require('../config'); 

console.log(JWT_SECRET, 'THIS IS THE JWT_SECRET')

const basicStrategy = new BasicStrategy((username, password) => {
    let user; 
    User
        .findOne({ username: username })
        .then(_user => {
            user = _user; 
            if(!user){
                return Promise.reject({
                    reason: 'Login Error',
                    message: 'Incorrect username or password'
                }); 
            }
            return user.validatePassword(password); 
        })
        .then(isValid => {
            if(!isValid) {
                return Promise.reject({
                    reason: 'Login Error', 
                    message: 'Incorrect username or password'
                });
            }
            return callback(null, user); 
        })
        .catch(err => {
            console.log("HELLO")
            if(err.reason === 'Login Error') {
                return callback(null, false, err)
            }
            return callback(err, false); 
        }); 
}); 

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET, 
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    }, 
    (payload, done) => {
        done(null, payload.user);
    }
);

module.exports = { basicStrategy, jwtStrategy }