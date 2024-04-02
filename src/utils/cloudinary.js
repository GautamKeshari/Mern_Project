// Now let we assume that our local files already load in the server,now by giving some local path from the same,we put same file load into the cloudinary

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async(localFilePath)=> {
    try {
        if(!localFilePath) return null;
        //now we have to upload file in cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("File is uploaded on cloudinary ",response.url)
        return response
    } catch (error) {
        //since we use cloudinary ,so we sure that loacal file is uploaded in server, but may be these file are corrupted or of no use ,so we have to remove it from server
        fs.unlinkSync(localFilePath)   //remove the locally saved temporary file as the upload operation got failed
        return null;
        
    }
}

export {uploadOnCloudinary}