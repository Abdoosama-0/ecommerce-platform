const jwt=require('jsonwebtoken')
const redis = require('../config/redis')
const User=require('../models/users')
//========================================================================
const isLoggedIn=(req,res,next)=>{
if(req.cookies&&req.cookies.access_token){
  
   return res.status(403).json({message:"you are already logged in"})
}
  return next()
}
//==========================================================================================

//==========================================================================================
const refreshAccessToken=(refreshToken)=>{
  const userPayload=jwt.verify(refreshToken,process.env.SECRET_TOKEN)
  const newAccessToken=jwt.sign(userPayload, process.env.SECRET_TOKEN, { expiresIn: "1h" });
  return newAccessToken
}



const verifyToken= async (req, res, next) => {
    const accessToken = req.cookies.access_token 
    if (!accessToken) {
        console.log("no access_token")
        return res.status(401).json({ message: "Unauthorized, you must have accessToken to do this" });
    }

    try {
        const decodedPayload = jwt.verify(accessToken, process.env.SECRET_TOKEN ); 
//====================================================================================

const user = await User.findById(decodedPayload.userID);

        if (!user) {
            return res.status(404).json({ msg: "User not found1" });
        }

        
        if (user.isBanded) {
            res.clearCookie("access_token");
            await redis.del(`refresh:${user.userID}`);
            return res.status(403).json({ msg: "You have been blocked. Please contact support." });
        }
//====================================================================================

        req.user = decodedPayload;
    
        return next();
    } catch (error) {
      
        if (error.name === "TokenExpiredError") {
          console.log("JWT expired")
          const userPayload=jwt.decode(accessToken)
         
          const refresh= await redis.get((`refresh:${userPayload.userID}`))
         
          const newAccessToken=refreshAccessToken(refresh)
          if (!newAccessToken){
            return res.status(500).json({ error: "failed refreshToken",msg:error.message  });
          }
          res.cookie("access_token", newAccessToken, { httpOnly: true, secure: false, });
       
          req.user = userPayload;
          return next();

          } else {

            console.log(error)
            return res.status(403).json({msg:"invalid token"})
          }
    }
};




/**
access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2ODAzMjJmZDAxMzg5NmZhMzUwNTcxZTgiLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE3NDUyODI2NjEsImV4cCI6MTc0NTI4NjI2MX0.98758NNGuJ2rIUMlmK-QFz7iKbLBGKdHmqix2Llg88o; Path=/; HttpOnly; Expires=Wed, 23 Apr 2025 00:44:21 GMT;
 */

//==========================================================================================
const isAdmin =async(req,res,next)=>{

  const token=req.cookies.access_token 
 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, you must have accessToken to do this" });
  }
  try{
  const decodedPayload = jwt.verify(token, process.env.SECRET_TOKEN );
  console.log("decodedPayload",decodedPayload)

  if(!decodedPayload) {
    return res.status(401).json({ message: "wrong access token" });
  }
  const isadmin=decodedPayload.isadmin

  if(isadmin){

    return next()
  }
  else{
    console.log("not admin")
    return res.status(403).json({ message: "you are not admin" });
  }
}catch(error){
  console.log("error",error)
  return res.status(403).json({ message: "invalid token" });

}}


//==========================================================================================
module.exports={isLoggedIn,verifyToken,isAdmin}



