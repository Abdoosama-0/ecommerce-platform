const express = require('express')
const router=express.Router()
const {addProduct,getProducts,getProductById,editProduct,deleteProduct}=require('../controllers/adminControllers')
const upload=require('../config/multer')
const {verifyToken,isAdmin}=require('../Middleware/authMiddleware')
// router.use(verifyToken)
// router.use(isAdmin)

router.post('/addProduct',upload.array("images"),addProduct)
router.get('/getProducts',getProducts)
router.get('/getProductById',getProductById)
router.delete('/deleteProduct',deleteProduct)
router.patch('/editProduct',upload.array("images"),editProduct)
module.exports=router