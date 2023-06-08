const express= require('express')
const router = express.Router();
const usercontroller= require('../controllers/user.controller.js');




//password resets routes
router.get('/passwordreset/:token', usercontroller.CheckPasswordResetUser)
router.post('/passwordreset/:token', usercontroller.ResetPassword)
router.post('/passwordreset', usercontroller.SendPasswordResetLink)


module.exports=router;