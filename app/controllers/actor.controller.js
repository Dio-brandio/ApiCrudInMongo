const StatusCode = require("../constraints/response-codes")
const Actor =require("../models/Actor");
const Movie = require("../models/Movie");

async function InssertActor(req, res) {
    try {
        const newActor =new Actor(req.body);
        await newActor.save()
        return res.status(StatusCode.OK).json({ users: newActor, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

async function GetMovies(req, res) {
    try {
        const allActors  = await Actor.find();
        const allmovies  = await Movie.find().populate("actors_id").exec()
        return res.status(StatusCode.OK).json({ actors:allActors, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}


module.exports = { InssertActor,GetMovies}