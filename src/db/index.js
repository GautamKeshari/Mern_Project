import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connect_DB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // now data from database can be stored in constant
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ",error)
        process.exit(1)
        // 0 means end the process without any kind of failure and 1 means end the process with some failure.
        // Now ,error is handled
    }
}

export default connect_DB;