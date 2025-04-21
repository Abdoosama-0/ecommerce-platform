require('dotenv').config()
const User=require('../models/users')
const passport=require('passport')

const bcrypt=require('bcrypt')
const validator = require('validator');

//=========================================
const jwt=require('jsonwebtoken')
const redis=require('../config/redis')

//=========================================================================

const localLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, async(err, user, info) => {
      if (err) return res.status(500).json({ message: "Server error", error: err }) 
      if (!user) return res.status(401).json({ message: info?.message|| "Invalid username or password" }) 
      
       const Payload={userID:user._id.toString(),isadmin:user.isadmin}
       console.log(Payload)
      const accessToken = jwt.sign(Payload, process.env.SECRET_TOKEN, { expiresIn: "1h" });
      console.log(accessToken)
      const refreshToken = jwt.sign(Payload, process.env.SECRET_TOKEN);
      console.log(refreshToken)
      await redis.set(`refresh:${user._id.toString()}`,  refreshToken); 
      res.cookie("access_token", accessToken, { httpOnly: true, secure: false,maxAge:24*60*60*1000 });
      if(user.isadmin){
        return res.json({message:'welcome admin',isadmin:user.isadmin})
      }
      return res.json({message:'welcome user'})
  })(req, res, next)
}

const register = async(req,res)=>{
    const {name,email,username,password}=req.body
//===================================================================check email=============================================
//is eil valid
     if(!validator.isEmail(email)){
       return res.status(400).json({msg:"this is not an email"})
     }
//is email already token
     const emailIsExists=await User.findOne({email:email})
     if(emailIsExists){
        return res.status(400).json({msg:"this email is already used"})
     }
//===================================================================check username=============================================
//is username already token
const usernameIsExists=await User.findOne({username:username})
if(usernameIsExists){
   return res.status(400).json({msg:"this username is already used"})
}
//===================================================================check password=============================================
if(!validator.isStrongPassword(password)){
    return res.status(400).json({msg:"Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."})
}


//================================================================================================================


//================================================================================================================
    const hashed =await bcrypt.hash(password,10)
    const newUser=new User({
         name,
         email,
         username,
         password:hashed,
        
    })
    await newUser.save()
    res.json({msg:"done"})//res.redirect('/auth/login')

}
module.exports={register,localLogin}