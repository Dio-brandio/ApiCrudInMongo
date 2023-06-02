
const express= require('express')
const app = express()
var cookieParser = require('cookie-parser')
const port = 4000
require("dotenv").config();
const userroutes =require('./app/routes/user.routes.js') ;
const authroutes =require('./app/routes/auth.routes.js') ;
const actorroutes =require('./app/routes/actor.routes.js') ;
const movieroutes =require('./app/routes/movie.routes.js') ;
const { CheckCookie } = require('./app/middleware/authtoken.js');
require("./config/dbconfig.js");


//db connnectiom



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())



app.use('/user',CheckCookie ,userroutes);
app.use('/actor' ,actorroutes);
app.use('/auth', authroutes);
app.use('/movie', movieroutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})