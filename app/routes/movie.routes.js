const express= require('express')
const router = express.Router();
const moviecontroller= require('../controllers/movie.controller.js');

// get all movies 
router.get('/allmovies', moviecontroller.GetMovies)

//create new movie
router.post('/new', moviecontroller.InsretMovie)


module.exports=router;
