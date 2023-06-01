const express= require('express')
const router = express.Router();
const userservice = require('../controllers/user.controller.js');

router.get('/allusers', userservice.GetUsers)
router.get('/:userid', userservice.GetUser)
router.post('/new', userservice.CreateUser)
router.delete('/delete/:userid', userservice.DeleteUser)
router.put('/update/:userid', userservice.UpdateUser)


module.exports=router;
