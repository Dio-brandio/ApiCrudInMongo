const express= require('express')
const router = express.Router();
const usercontroller= require('../controllers/user.controller.js');

router.get('/allusers', usercontroller.GetUsers)
router.get('/profile', usercontroller.GetProfile)
router.get('/:userid', usercontroller.GetUser)
router.get('/passwordreset/:token', usercontroller.CheckPasswordResetUser)

router.post('/passwordreset/:token', usercontroller.ResetPassword)


router.post('/new', usercontroller.CreateUser)
router.post('/passwordreset', usercontroller.SendPasswordResetLink)


router.put('/update/:userid', usercontroller.UpdateUser)

router.delete('/delete/:userid', usercontroller.DeleteUser)



module.exports=router;
