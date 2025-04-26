require('../config/mongo')
const bcrypt =require('bcrypt')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    googleId:{
          type:Number
    },
    name:{
        type:String

    },
    email:{
        type:String
    },

    username:{
        type:String
    },
 
    password:{
        type:String
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
    cart: {
        type: Array, 
        default: [] 
    },

})
userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
const User =mongoose.model('User',userSchema)
module.exports= User