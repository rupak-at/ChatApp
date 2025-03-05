import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  
        trim: true,
        minlength: 3,  
      },
      email: {
        type: String,
        required: true,
        unique: true,  
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
      },
      password: {
        type: String,
        required: true,
        minlength: 8,  
      },
      avatar: {
        type: String,  
      },
      isOnline: {
        type: Boolean,
        default: false
      },
      refreshToken: {
        type: String,
        default: null
      },
},{timestamps: true})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
  )
}

userSchema.methods.generateAccessToekn = async function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
  )
}
export const User = mongoose.model('User', userSchema)