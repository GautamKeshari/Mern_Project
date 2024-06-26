import mongoose, { Schema } from "mongoose"
// https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj
import pkg from "jsonwebtoken";
const { Jwt } =pkg;
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar: {
        type:String,   //cloudinary url
        required:true,
    },
    coverImage: {
        type:String,   //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref:"Video",
        }
    ],
    password: {
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps: true      
})

// now each time if password is changed then before saving bcrypt encrypts the password.
userSchema.pre("save" ,async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

//now bcrypt store password in encrypted form,but userSchema send password outside in unencryted form ,so we first verify that is both encrypted and unencrypted data is same or not.
userSchema.methods.isPasswordCorrect=
    async function(password){
        return await bcrypt.compare(password,this.password)
    }

userSchema.methods.generateAccessToken=function(){
    return Jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return Jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)