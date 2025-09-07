const express = require('express')
const router=express.Router()

const {register,localLogin,isAuth,googleAuth,googleAuthCallback,verifyOtp,forgetPassword,recreatePassword}=require('../controllers/authControllers')

router.post('/forgetPassword',forgetPassword)
router.post('/recreatePassword',recreatePassword)

router.post('/verifyOtp',verifyOtp)
router.post('/register',register)
router.post('/localLogin',localLogin)

router.get("/google" ,googleAuth);

router.get("/google/callback", googleAuthCallback);
router.get("/me", isAuth);
module.exports=router

