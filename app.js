
const express= require('express')
const app = express()
const usersRouter =require('./app/routes/user.routes.js') ;
const port = 4000
const con = require("./config/dbconfig.js");


//db connnectiom



app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})