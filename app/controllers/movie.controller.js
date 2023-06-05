const StatusCode = require("../constraints/response-codes")
const Movie = require("../models/Movie");
const mongoose = require("mongoose");
const MovieActor = require("../models/MovieActor");
const { ToObjectId } = require("../utils/ObjectIdHelper");



async function GetMovies(req, res) {
    try {
        const allActors  = await Actor.find();
        return res.status(StatusCode.OK).json({ actors:allActors, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

async function InsretMovie(req,res) {
    try {
        
        const newMovie = new Movie({
            name:req.body.name,
            release_date:new Date(req.body.release_date)
        })
        await newMovie.save();

        const movieActors = Array.from(req.body.actorid).map((actorid)=>{
                return{
                    movie_id:newMovie._id,
                    actor_id:ToObjectId(actorid) 
                }
        })
        const insertedMovieActors = await MovieActor.insertMany(movieActors);
        return res.status(StatusCode.EntryCreated).json({insertedMovieActors,ok:true})

    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

module.exports = { GetMovies ,InsretMovie}