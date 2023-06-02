const express= require('express')
const router = express.Router();
const actorcontroller= require('../controllers/actor.controller.js');

router.post('/new', actorcontroller.InssertActor)
router.get('/movie', actorcontroller.GetMovies)


module.exports=router;
