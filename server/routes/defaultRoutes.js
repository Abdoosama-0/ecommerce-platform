const express = require('express')
const router=express.Router()
const {order}=require('../controllers/defaultControllers')

router.post('/order',order)
module.exports=router