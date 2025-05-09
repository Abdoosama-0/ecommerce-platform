const jwt=require('jsonwebtoken')
const User =require('../models/user')
//========================================================================


//==========================================================================================
const isAdmin =async(req,res,next)=>{

  const token=req.cookies.access_token 
 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, you must have accessToken to do this" });
  }
  try{
  const decodedPayload = jwt.verify(token, process.env.SECRET_TOKEN );
  

  if(!decodedPayload) {
    return res.status(401).json({ message: "wrong access token" });
  }
  const user =await User.findById(decodedPayload.userID)
  if (!user){
    return res.status(404).json({ message: "user not found" });
  }
  const isAdmin=decodedPayload.isAdmin

  if(isAdmin){
    req.userID =decodedPayload.userID
    return next()
  }
  else{

    return res.status(403).json({ message: "you are not admin" });
  }
}catch(error){
  console.log("error",error)
  return res.status(403).json({ message: "invalid token" });

}}

const isUser =async(req,res,next)=>{

  const token=req.cookies.access_token 
 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, you must have accessToken to do this" });
  }
  try{
  const decodedPayload = jwt.verify(token, process.env.SECRET_TOKEN );
  

  if(!decodedPayload) {
    return res.status(401).json({ message: "wrong access token" });
  }

  const user =await User.findById(decodedPayload.userID)
  if (!user){
    return res.status(404).json({ message: "user not found" });
  }

req.userId =decodedPayload.userID

return next()


}catch(error){
  console.log("error",error)
  return res.status(403).json({ message: "invalid token" });

}}
//==========================================================================================
module.exports={isAdmin,isUser}



