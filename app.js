
const express= require('express')
const app = express()
var cookieParser = require('cookie-parser')
const port = 4000
require("dotenv").config();


const userroutes =require('./app/routes/user.routes.js') ;
const authroutes =require('./app/routes/auth.routes.js') ;
const actorroutes =require('./app/routes/actor.routes.js') ;
const movieroutes =require('./app/routes/movie.routes.js') ;
const exerciseroutes =require('./app/routes/exercise.routes.js') ;
const passwordresetroutes =require('./app/routes/passwordReset.routes.js') ;


const { CheckCookie } = require('./app/middleware/authtoken.js');
const { SeedMovie } = require('./config/seeder.js');
require("./config/dbconfig.js");


//db connnectiom



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())



app.use('/user',CheckCookie ,userroutes);
app.use('/actor' ,actorroutes);
app.use('/auth', authroutes);
app.use('/movie', movieroutes);
app.use('/exercise', exerciseroutes);
app.use('/password', passwordresetroutes);

SeedMovie()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})