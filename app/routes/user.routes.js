const express= require('express')
const router = express.Router();
const usercontroller= require('../controllers/user.controller.js');
const { CheckCookie } = require('../middleware/authtoken.js');

router.get('/allusers', usercontroller.GetUsers)
router.get('/:userid', usercontroller.GetUser)
router.post('/new', usercontroller.CreateUser)
router.delete('/delete/:userid', usercontroller.DeleteUser)
router.put('/update/:userid', usercontroller.UpdateUser)


module.exports=router;
