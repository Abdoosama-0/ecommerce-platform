require('../config/mongo')
const bcrypt =require('bcrypt')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const addressSchema = new mongoose.Schema({
    government: { type: String, required: true },
    city: { type: String, required: true },
    area :{ type: String, required: true },
    street: { type: String },
    buildingNumber: { type: Number },
    departmentNumber: { type: Number },
  
  });
const userSchema=new Schema({
    googleId:{
          type:Number
    },
    name:{
        type:String,
        required: true

    },
    email:{
        type:String,
        required: true
    },

    username:{
        type:String,
        required: true
    },
 
    password:{
        type:String,
        required: false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
    cart: [
        {
            _id: false,
          productId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
          quantity: { type: Number, required: true }
        }
      ],
      
    phone:{
        type:String,
        required: false
    },
    addresses: [addressSchema],
    isBanned:{
        type:Boolean,
        default:false
    },

})
userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
const User =mongoose.model('User',userSchema)
module.exports= User