const express = require('express')
const router=express.Router()

const {register,localLogin,}=require('../controllers/authControllers')


router.post('/register',register)
router.post('/localLogin',localLogin)
module.exports=router