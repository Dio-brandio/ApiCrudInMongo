const express= require('express')
const router = express.Router();
const moviecontroller= require('../controllers/movie.controller.js');

router.get('/allmovies', moviecontroller.GetMovies)
router.post('/new', moviecontroller.InsretMovie)


module.exports=router;
