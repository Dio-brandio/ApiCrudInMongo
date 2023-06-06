const express= require('express')
const router = express.Router();
const excontroller = require('../controllers/exercise.controller.js');


router.get('/all', excontroller.GetAllExercise)


module.exports=router;
