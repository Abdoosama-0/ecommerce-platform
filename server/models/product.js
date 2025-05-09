require('../config/mongo')
const mongoose =require('mongoose')
const Schema=mongoose.Schema
const productSchema = new Schema({
    imageUrls: [{ type: String }],
    title:{
        type:String  
    },
    price:{
        type: Number
    },
    details:{
        type:String  
    },
    category:{
        type:String  
    }
})

const Product =mongoose.model('Product',productSchema)
module.exports= Product