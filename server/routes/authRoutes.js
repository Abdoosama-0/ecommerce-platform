const express = require('express')
const router=express.Router()

const {register,localLogin,verifyOtp,forgetPassword,recreatePassword}=require('../controllers/authControllers')

router.post('/forgetPassword',forgetPassword)
router.post('/recreatePassword',recreatePassword)

router.post('/verifyOtp',verifyOtp)
router.post('/register',register)
router.post('/localLogin',localLogin)
module.exports=router

