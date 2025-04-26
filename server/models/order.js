require('../config/mongo')
const mongoose =require('mongoose')
const Schema=mongoose.Schema
const orderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: Number,
      }
    ],
    createdAt: { type: Date, default: Date.now },
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
  });

  const order =mongoose.model('order',orderSchema)
  module.exports= order
  