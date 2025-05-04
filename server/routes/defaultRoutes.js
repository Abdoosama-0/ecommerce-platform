const express = require('express')
const router=express.Router()
const {order,products,product,welcomeUser,address,cart,addToCart,clearCart,logout,addresses,increaseQuantity,decreaseQuantity,deleteFromCart}=require('../controllers/defaultControllers')
const { isUser } = require('../Middleware/authMiddleware')

router.post('/order',isUser,order)
router.get('/products',products)
router.get('/product',product)
router.get('/welcomeUser',isUser,welcomeUser)
router.post('/address',isUser,address)
router.get('/cart',isUser,cart)
router.post('/addToCart',isUser,addToCart)
router.delete('/clearCart',isUser,clearCart)
router.post('/logout',isUser,logout)
router.get('/addresses',isUser,addresses)
router.patch('/increaseQuantity',isUser,increaseQuantity)
router.patch('/decreaseQuantity',isUser,decreaseQuantity)
router.delete('/deleteFromCart',isUser,deleteFromCart)


module.exports=router