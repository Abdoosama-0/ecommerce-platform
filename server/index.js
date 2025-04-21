const express = require('express');
const cookieParser = require("cookie-parser");
require('./config/mongo')
require('./config/redis')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: 'http://localhost:3001', // الدومين اللي جاي منه الفرونت
    credentials: true,
  }));
app.use(cookieParser())
app.use(express.json()) 

//=======================middleware========================


const passport =require('./config/passport')
app.use(passport.initialize())


const authRoutes=require('./routes/authRoutes')
app.use('/auth',authRoutes)

const adminRoutes=require('./routes/adminRoutes')
app.use('/admin',adminRoutes)
//=======================routes========================

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/test', (req, res) => {
    const {name,email,username,password}=req.body
    res.json({msg:'Hello, World!' , name:name,email:email,username:username,password:password});    
});
//=======================server========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});