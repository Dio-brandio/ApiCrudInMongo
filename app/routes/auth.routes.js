const express= require('express')
const router = express.Router();
const authcontroller = require('../controllers/auth.controller.js');


router.post('/login', authcontroller.CheckLoginCrendentials)
router.post('/register', authcontroller.RegisterUser)


module.exports=router;
