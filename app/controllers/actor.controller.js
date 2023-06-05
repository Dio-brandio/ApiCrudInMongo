const StatusCode = require("../constraints/response-codes")
const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const { CheckValidId, ToObjectId } = require("../utils/ObjectIdHelper");

async function InssertActor(req, res) {
    try {
        const newActor = new Actor(req.body);
        await newActor.save()
        return res.status(StatusCode.OK).json({ users: newActor, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

async function GetMoviesByActor(req, res) {
    try {
        const actorid = ToObjectId(req.params.actorid);
        if (actorid !== undefined && actorid !== null) {
            if (!CheckValidId(actorid)) {
                return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
            }

            const allmoviesidbyactor = await Actor.aggregate([
                { $match: { _id: actorid } },
                {
                    $lookup: {
                        from: "movieactors",
                        localField: "_id",
                        foreignField: "actor_id",
                        as: "movies",
                    },
                },
                {
                    $lookup: {
                        from: "movies",
                        localField: "movies.movie_id",
                        foreignField: "_id",
                        as: "movies",
                        pipeline: [
                            { $project: { _id: false } }
                        ]
                    },
                },
                { $project: { _id: false } },

            ])
            return res.status(StatusCode.OK).json({ allmoviesidbyactor, ok: true })

        }
        return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}



module.exports = { InssertActor, GetMoviesByActor }