require('dotenv').config()
const User=require('../models/user')
const passport=require('passport')

const bcrypt=require('bcrypt')
const validator = require('validator');

//=========================================
const jwt=require('jsonwebtoken')


//=========================================================================

const localLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, async(err, user, info) => {
    
      if (err) return res.status(500).json({ message: "Server error", error: err }) 
      if (!user) return res.status(401).json({ message: info?.message|| "Invalid username or password" }) 

        const cart=req.body.cart||[]
      
      const editUser =await User.findById(user._id)
      if (!editUser) return res.status(401).json({ message: "User not found" })
        editUser.cart=[...cart,...editUser.cart]
      await editUser.save()

       const Payload={userID:user._id.toString(),isAdmin:user.isAdmin}
      
      const accessToken = jwt.sign(Payload, process.env.SECRET_TOKEN, { expiresIn: "72h" });
      
   
      res.cookie("access_token", accessToken, { httpOnly: true, secure: false, maxAge: 100 * 365 * 24 * 60 * 60 * 1000 }); // 100 years
      
     
      return res.json({message:'welcome ', isAdmin:user.isAdmin ,accessToken})
  })(req, res, next)
}

const register = async(req,res)=>{
    const {name,email,username,password,phone}=req.body
    if(
      !name||!email||!username||!password||!phone
    ){
      return res.status(400).json({message:"complete the data please"})
    }
//===================================================================check email=============================================
//is eil valid
     if(!validator.isEmail(email)){
       return res.status(400).json({message:"this is not an email"})
     }
//is email already token
     const emailIsExists=await User.findOne({email:email})
     if(emailIsExists){
        return res.status(400).json({message:"this email is already used"})
     }
//===================================================================check username=============================================
//is username already token
const usernameIsExists=await User.findOne({username:username})
if(usernameIsExists){
   return res.status(400).json({message:"this username is already used"})
}
//===================================================================check password=============================================
if(!validator.isStrongPassword(password)){
    return res.status(400).json({message:"Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."})
}


//================================================================================================================



//================================================================================================================
    const hashed =await bcrypt.hash(password,10)
    const newUser=new User({

       
         name,
         email,
         username,
         password:hashed,
         phone,
        
    })
    await newUser.save()
    res.json({message:"done"})

}
module.exports={register,localLogin}