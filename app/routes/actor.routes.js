const express= require('express')
const router = express.Router();
const actorcontroller= require('../controllers/actor.controller.js');

//create new actor 
    router.post('/new', actorcontroller.InssertActor)
// get moveies of multiple actors according
    router.post('/movieofactors', actorcontroller.GetMoviesByActors)



//get movies of specific actor
    router.get('/movie/:actorid', actorcontroller.GetMoviesByActor)

// get all actors 
router.get('/all', actorcontroller.GetAllActors)

//get specific actor
router.get('/:actorid', actorcontroller.GetActor)


module.exports=router;
