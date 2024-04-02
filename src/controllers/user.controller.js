import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { response } from "express";

const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend
    // validation - not empty
    // check if user alredy exist: username,email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object, create entry in database
    // remove password and refresh token field from response
    // check for user creation
    // return res
    
    const {username,email,fullName,password} = req.body
    console.log("Email: ",email)
    
    // some => Determines whether the specified callback function returns true for any element of an array.
    if(
        [username,email,fullName,password].some((field)=>
            field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }


    const existedUser= await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with same username or email already existed")
    }
    // since in req.body we have already all the field defined in user model,
    // but since we injected middleware before final registration of user in (user.routes.js),so middlewares add more field inside the request

    // req.body => given by express
    // req.files => access given by multer

    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath);
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage =await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    // If coverImage exist then take out coverImage.url, else take out empty string
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrrong while registering a user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})

export {registerUser}