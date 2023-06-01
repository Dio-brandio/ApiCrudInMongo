
const express= require('express')
const app = express()
const port = 4000
require("dotenv").config();
const usersRouter =require('./app/routes/user.routes.js') ;
const authRouter =require('./app/routes/auth.routes.js') ;
require("./config/dbconfig.js");


//db connnectiom



app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})