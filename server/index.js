//============================Dependencies===============================
const express = require('express');

const cookieParser = require("cookie-parser");
require('./config/mongo')
require('./config/redis')
const cors = require('cors');
//========================Global Middleware===============================

const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
  }));
app.use(cookieParser())
app.use(express.json()) 

const passport =require('./config/passport')
app.use(passport.initialize())

//=======================Route Handlers========================



const authRoutes=require('./routes/authRoutes')
app.use('/auth',authRoutes)

const adminRoutes=require('./routes/adminRoutes')
app.use('/admin',adminRoutes)

const defaultRoutes=require('./routes/defaultRoutes')
app.use('/',defaultRoutes)
//=======================Basic Route========================

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//test server errors
app.get('/error', (req, res,next) => {
    try{
   const x=2
   x=1
    res.json({message:x});
}catch(err){
    next(err)
}
});
//================================ error handler middleware=============================
require('./Middleware/errorMiddleware')(app)
// ==================== Start Server ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});