const express = require('express')
const router=express.Router()
const {order,products,product,welcomeUser,address,cart,addToCart,getProductQuantity,
    clearCart,logout,addresses,increaseQuantity,decreaseQuantity,deleteFromCart,userData,updateUserData,
    deleteAddress,updateAddress,getAddressById,getCategories,getUserOrders,cancelOrder,restoreOrder 
    
    ,getPaymentMethods,
    executePayment,
    fawaterkWebhook
}=require('../controllers/defaultControllers')
const { isUser } = require('../Middleware/authMiddleware')

router.get("/payment-methods", getPaymentMethods);
router.post("/execute-payment", executePayment);
router.post("/fawaterk/webhook_json", fawaterkWebhook);


router.post('/order',isUser,order)
router.get('/products/:category',products)
router.get('/product',product)
router.get('/welcomeUser',isUser,welcomeUser)
router.post('/address',isUser,address)
router.get('/cart',isUser,cart)
router.post('/addToCart',isUser,addToCart)
router.delete('/clearCart',isUser,clearCart)
router.post('/logout',logout)
router.get('/addresses',isUser,addresses)
router.patch('/increaseQuantity',isUser,increaseQuantity)
router.patch('/decreaseQuantity',isUser,decreaseQuantity)
router.delete('/deleteFromCart',isUser,deleteFromCart)
router.get('/userData',isUser,userData)
router.patch('/updateUserData',isUser,updateUserData)
router.delete('/deleteAddress/:addressId',isUser,deleteAddress)
router.get('/getAddressById/:addressId',isUser,getAddressById)
router.get('/getProductQuantity/:productId',getProductQuantity)
router.patch('/updateAddress/:addressId',isUser,updateAddress)
router.get('/getCategories',getCategories)
router.get('/getUserOrders/:status',isUser,getUserOrders)
router.patch('/cancelOrder/:orderId',isUser,cancelOrder)
router.patch('/restoreOrder/:orderId',isUser,restoreOrder)
module.exports=router