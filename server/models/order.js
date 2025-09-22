require('../config/mongo')
const mongoose =require('mongoose');

const Schema=mongoose.Schema
const addressSchema = new mongoose.Schema({
    government: { type: String, required: true },
    city: { type: String, required: true },
    area :{ type: String, required: true },
    street: { type: String },
    buildingNumber: { type: String },
    departmentNumber: { type: String },
  });
const orderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    payment_method_id:{type: String},
    invoice_id:{type: String},
    invoice_key:{type: String},
    paymentStatus:{type: String},

   
    products: [
      {
        _id: false, 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      }
    ],
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    address:{ type: addressSchema,required:true },
    paymentMethod:{ type: String, default: 'cash on delivery' },
  });

  const Order = mongoose.model('Order', orderSchema); 
  module.exports = Order;