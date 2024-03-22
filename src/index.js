// require('dotenv').config({path:"./env"}) 
import dotenv from 'dotenv'
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connect_DB from "./db/index.js";

dotenv.config({path:"./env"})

connect_DB()
// Now after importing connect_DB() our work is over









/*

import express from "express"
const app=express()

( async()=>{
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