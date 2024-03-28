import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
// these cookieParser and cors configure after making app

const app=express()
app.use(cors({
    origin:process.env.CROS_ORIGIN,      //we have to specifically mention that from where our url is coming
    credentials:true,
}))

//Since many data are coming ,and not necessary that they are in json format
app.use(express.json({limit:"16kb"}))             //this is use for accepting the backend data fill in the form
//In older version express js does not directly accept the json file, we have to use body parser(use for data)
// we use multer, for configure file uploading
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())
export {app}