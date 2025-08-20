require('../config/mongo')
const mongoose =require('mongoose')
const Schema=mongoose.Schema
const CategorySchema = new Schema({
   name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  description: {
    type: String,
    required: true,}
    ,
  categoryPhoto: {
    type: String,
    required: true,
  }
}, {
  timestamps: true 
}
);


const Category =mongoose.model('Category',CategorySchema)
module.exports= Category