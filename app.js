
const express= require('express')
const app = express()
var cookieParser = require('cookie-parser')
const port = 4000
require("dotenv").config();
const usersRouter =require('./app/routes/user.routes.js') ;
const authRouter =require('./app/routes/auth.routes.js') ;
const { CheckCookie } = require('./app/middleware/authtoken.js');
require("./config/dbconfig.js");


//db connnectiom



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())



app.use('/user',CheckCookie ,usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})