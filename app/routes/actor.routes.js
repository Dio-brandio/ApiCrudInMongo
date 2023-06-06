const express= require('express')
const router = express.Router();
const actorcontroller= require('../controllers/actor.controller.js');

router.post('/new', actorcontroller.InssertActor)
router.get('/movie/:actorid', actorcontroller.GetMoviesByActor)
router.get('/:actorid', actorcontroller.GetActor)
router.get('/all', actorcontroller.GetAllActors)


router.post('/movieofactors', actorcontroller.GetMoviesByActors)
// router.get('/movie', actorcontroller.GetMovies)
module.exports=router;
