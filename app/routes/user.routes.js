const express= require('express')
const router = express.Router();
const usercontroller= require('../controllers/user.controller.js');

//get routes for getting info of users
router.get('/allusers', usercontroller.GetUsers)
router.get('/profile', usercontroller.GetProfile)
router.get('/:userid', usercontroller.GetUser)


//password resets routes
router.get('/passwordreset/:token', usercontroller.CheckPasswordResetUser)
router.post('/passwordreset/:token', usercontroller.ResetPassword)
router.post('/passwordreset', usercontroller.SendPasswordResetLink)


//create new user
router.post('/new', usercontroller.CreateUser)

//update user
router.put('/update/:userid', usercontroller.UpdateUser)

//delete user
router.delete('/delete/:userid', usercontroller.DeleteUser)



module.exports=router;
