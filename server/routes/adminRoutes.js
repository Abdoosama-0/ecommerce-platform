const express = require('express')
const router=express.Router()
const {addProduct,getProducts,getProductById,editProduct,deleteProduct,
    adminWelcome,getOrders,getOrder,updateOrderStatus,getUsers,banUser}=require('../controllers/adminControllers')
const upload=require('../config/multer')
const {isAdmin}=require('../Middleware/authMiddleware')

router.use(isAdmin)

router.get('/adminWelcome',adminWelcome)
router.post('/addProduct',upload.array("images"),addProduct)
router.get('/getProducts',getProducts)
router.get('/getProductById',getProductById)
router.delete('/deleteProduct',deleteProduct)
router.patch('/editProduct',upload.array("images"),editProduct)
router.get('/getOrders',getOrders)
router.get('/getOrder',getOrder)
router.patch('/updateOrderStatus',updateOrderStatus)
router.get('/getUsers',getUsers)
router.patch('/banUser',banUser)

module.exports=router