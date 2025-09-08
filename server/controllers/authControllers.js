require('dotenv').config()
const User=require('../models/user')
const passport=require('passport')

const bcrypt=require('bcrypt')
const validator = require('validator');
const redis = require('../config/redis')
const crypto = require("crypto");
const {transporter, sendEmailWithLink } = require("../config/email");


//=========================================
const jwt=require('jsonwebtoken')


//=========================================================================

const localLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, async(err, user, info) => {
    
      if (err) return res.status(500).json({ message: "Server error", error: err }) 
      if (!user) return res.status(401).json({ message: info?.message|| "Invalid username or password" }) //err

        const cart=req.body.cart||[]
      
      const editUser =await User.findById(user._id)
      if (!editUser) return res.status(401).json({ message: "User not found" })
const mergedCart = [...editUser.cart, ...cart];
const uniqueCart = Array.from(
  new Map(
    mergedCart.map((item) => [
      typeof item.productId === 'object' ? item.productId._id.toString() : item.productId.toString(),
      { 
        productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
        quantity: item.quantity 
      }
    ])
  ).values()
);

editUser.cart = uniqueCart;
await editUser.save();

       const Payload={userID:user._id.toString(),isAdmin:user.isAdmin}
      
      const accessToken = jwt.sign(Payload, process.env.SECRET_TOKEN);
      
   
      res.cookie("access_token", accessToken, { httpOnly: true, secure: true,sameSite: "none" , maxAge: 1000 * 60 * 60 * 24 * 365 * 100}); 
//d
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
//is email valid
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
    const otp = crypto.randomInt(100000, 999999).toString();
    await redis.set(`OTP:${email}`, JSON.stringify({
      otp,
      name,
      username,
      email,
      password: hashed,
      phone,
    }), 'EX', 300);
    const sendVerificationEmail = async (email, otp) => {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        text: `Your verification code is: ${otp}`
      });
    };
    const response = await sendVerificationEmail(email, otp);
    if (response.success) {
      res.status(200).json({ message: "OTP sent to your email. Please verify to complete registration." });    
    } else {
      return res.status(500).json({ message: "Failed to send email", error: response.error });
    }

 

   

}

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const userDataB = await redis.get(`OTP:${email}`);
  if (!userDataB) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }
  const userData = JSON.parse(userDataB);


  if (userData.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }


  const newUser = new User({
    phone:userData.phone,
    name: userData.name,
    email: userData.email,
    username: userData.username,
    password: userData.password
  });
  await newUser.save();


  await redis.del(`OTP:${email}`); 

  res.json({ message: "Email verified and registration completed successfully. Please login." });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const isUser = await User.findOne({email})
  if (!isUser){
  return res.status(404).json({message:"email not found"})
}  
const token = crypto.randomBytes(32).toString("hex");
await redis.set(
  `reset:${token}`,
  email,
  'EX',
  60 * 3 
);


const subject = "Reset password";
const linkText = "click here to Reset password";
const linkUrl = `${process.env.FRONT_URL}/auth/recreatePassword?token=${token}`;

const response = await sendEmailWithLink(email, subject, linkText, linkUrl);

if (response.success) {
  return res.status(200).json({ msg: "Email sent successfully. If you do not see it in your inbox, please check your spam or junk folder." });
} else {
  return res.status(500).json({ error: "Failed to send email", error: response.error });
}
}

const recreatePassword = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  const email = await redis.get(`reset:${token}`);
  if (!email) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }


  const { newPassword } = req.body


  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email not found" });
  }

  //===================================================================check password=============================================
  if (!validator.isStrongPassword(newPassword)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character." })
  }
  //================================================================================================================
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  await redis.del(`reset:${token}`); 

  return res.status(200).json({ message: "password recreated successfully, go back to login page" })

}

//=========================================================================
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
//----------
const googleAuthCallback = async (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, user, info) => {
    if (err ) {
      console.log(err)
      return res.status(400).json({ message: "Google authentication failed" });
    }
  if ( !user) {
      return res.status(400).json({ message: "Google authentication failed1" });
    }


    //==========================================
 const payload = { userID: user._id.toString(), isAdmin: user.isAdmin };
      
      const accessToken = jwt.sign(payload, process.env.SECRET_TOKEN);
      
   
      res.cookie("access_token", accessToken, { httpOnly: true, secure: false }); 

    //==========================================
    return res.redirect('http://localhost:3000/')



  })(req, res, next);
};



const isAuth = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated (there is no access_token)" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    return res.status(200).json({message:"authenticated"})
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};




module.exports={register,localLogin,verifyOtp,forgetPassword,recreatePassword,isAuth,googleAuth, googleAuthCallback}
