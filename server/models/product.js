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
        required:true
    },
    category:{
        type:String,
        required:true  
    }
})

const Product =mongoose.model('Product',productSchema)
module.exports= Product