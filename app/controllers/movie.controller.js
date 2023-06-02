const StatusCode = require("../constraints/response-codes")
const Movie = require("../models/Movie");


async function GetMovies(req, res) {
    try {
        const allmovies  = await Movie.find().populate("actors_id").exec()
        return res.status(StatusCode.OK).json({ movies:allmovies, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}


module.exports = {GetMovies}