// require('dotenv').config({path:"./env"}) 
import dotenv from 'dotenv'       //As early as possible our application load,then as early as possible our environment variable available to all the different files, import and configure env
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connect_DB from "./db/index.js";
import { app } from './app.js';

dotenv.config({path:"./env"})          //we can also config directly in package.json inside scripts

// Now after importing connect_DB() our work is over
connect_DB()
.then(()=>{
    //upto this only database is coonected,but no use of that database in the app.
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is listening on port: ${process.env.PORT}`)
    })

    app.on("error",(error)=>{
        console.log("ERR ",error)
        throw error
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed !!! ",err)
})





/*

import express from "express"
const app=express()

;( async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }catch{
        console.error("Error: ",error)
        throw err
    }
})()


*/