'use strict';

const mongoose = require('mongoose'); 
const express = require('express'); 
const app = express(); 
const {basicStrategy, jwtStrategy} = require('./strategies/strategies'); 
const passport = require('passport'); 
const {DATABASE_URL, PORT} = require('./config')
const characterRouter = require('./routes/characterRouter'); 
const authRouter = require('./routes/authRouter'); 
const userRouter = require('./routes/userRouter'); 
const Character = require('./models'); 
require('dotenv').config();
let server; 

passport.use(basicStrategy); 
passport.use(jwtStrategy); 

app.use('/james-bond-api/characters/', characterRouter); 
app.use('/login/', authRouter);
app.use('/users/', userRouter);  
app.use(express.static('public'));  

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "content-type");
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE"); 
    next(); 
})

function runServer(databaseUrl=DATABASE_URL, port=PORT){
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if(err){
                return reject(err); 
            }
            server = app.listen(port, () => {
                console.log(`App is listening on port ${port}`);
            })
            .on('error', err => {
                mongoose.disconnect(); 
                reject(err); 
            }); 
        });
    }); 
}

function closeServer(){
    return mongoose.disconnect().then(()=>{
        return new Promise((resolve, reject) => {
            server.close(err => {
                if(err){
                    return reject(err); 
                }
                resolve(); 
            })
        });    
    });
}

if(require.main === module){
    runServer().catch(err => console.error(err)); 
}

module.exports = {app, closeServer, runServer}; 