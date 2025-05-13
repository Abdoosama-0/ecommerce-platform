require('../config/mongo')
const mongoose =require('mongoose')
const Schema=mongoose.Schema
const productSchema = new Schema({
    imageUrls: { 
        type: [String], 
    required: true,

    },
    title:{
        type:String  ,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    details:{
        type:String  ,
        required:false
    },
    category:{
        type:String,
        required:true  
    },
    quantity:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

})

const Product =mongoose.model('Product',productSchema)
module.exports= Product