'use strict';

const mongoose = require('mongoose'); 
const express = require('express'); 
const app = express(); 
const {DATABASE_URL, PORT} = require('./config')
const characterRouter = require('./routes/characterRouter'); 
const Character = require('./models'); 
let server; 

app.use('/james-bond-api/characters/', characterRouter); 
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