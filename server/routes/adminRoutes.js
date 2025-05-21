const express = require('express')
const router=express.Router()
const {addProduct,getProducts,getProductById,editProduct,deleteProduct,addCategory,getCategories,deleteCategory,
    adminWelcome,getOrders,getOrder,updateOrderStatus,getUsers,banUser,getDeletedProducts,restoreProduct}=require('../controllers/adminControllers')
const upload=require('../config/multer')
const {isAdmin}=require('../Middleware/authMiddleware')

router.use(isAdmin)

router.get('/adminWelcome',adminWelcome)
router.post('/addProduct',upload.array("images"),addProduct)
router.get('/getProducts',getProducts)
router.get('/getProductById',getProductById)
router.delete('/deleteProduct/:productId',deleteProduct)
router.patch('/editProduct',upload.array("images"),editProduct)
router.get('/getOrders/:status',getOrders)
router.get('/getOrder',getOrder)
router.patch('/updateOrderStatus',updateOrderStatus)
router.get('/getUsers',getUsers)
router.get('/getDeletedProducts',getDeletedProducts)
router.post('/restoreProduct/:productId',restoreProduct)
router.patch('/banUser',banUser)
router.post('/addCategory',addCategory)
router.get('/getCategories',getCategories)
router.delete('/deleteCategory/:categoryId',deleteCategory)

module.exports=router