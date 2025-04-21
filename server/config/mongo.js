

const mongoose = require('mongoose');
const connectDB=async()=>{
    try{
        await
mongoose.connect("mongodb+srv://abdoosama00:Abdo00000@test.1lmps.mongodb.net/e-comm-project?retryWrites=true&w=majority")
console.log("✅ Connected to database ")

}catch(error){
    console.log("connection failed")
}
}
connectDB(); 
// module.exports=connectDB