const { default: mongoose } = require("mongoose");
const StatusCode = require("../constraints/response-codes")
const Actor = require("../models/Actor");
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
        // { $match: { _id: { $in:[actorid, ToObjectId("647d73e51e96f6e9661f4f94")]  } } },
        const joinoptions = [
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
           
        ]
        if (actorid !== undefined && actorid !== null) {
            if (!CheckValidId(actorid)) {
                return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
            }
            // joinoptions.push({ $match: { _id: actorid } })
        }
        const allmoviesidbyactor = await Actor.aggregate(joinoptions)
        return res.status(StatusCode.OK).json({ allmoviesidbyactor, ok: true })

    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}


async function GetAllActors(req, res) {
    try {
        const actors = await Actor.find()
        return res.status(StatusCode.OK).json({ actors, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

async function GetActor(req, res) {
    const actorid = ToObjectId(req.params.actorid);
    if (actorid !== undefined && actorid !== null) {
        if (!CheckValidId(actorid)) {
            return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
        }
    }
    const actors = await Actor.findById(actorid)
    return res.status(StatusCode.OK).json({ actors, ok: true })
}


async function GetMoviesByActors(req, res) {
    try {
        // { $match: { _id: { $in:[actorid, ToObjectId("647d73e51e96f6e9661f4f94")]  } } },
        const joinoptions = [
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
                        { $project: { _id: false } },
                        {
                            $match: {
                                "release_date":
                                {
                                    $gte:new Date('1975-01-01'),
                                    $lte:new Date('2000-01-01')
                                }
                            }
                        }

                    ]
                },
            },
            { $project: { _id: false } },
          
        ]
        if (req.body.actors.length === 0) {
            const movies = await Actor.aggregate(joinoptions)
            return res.status(StatusCode.OK).json({ movies, ok: true })
        }
        const allmoviesidbyactor = await Actor.aggregate(
            [{ $match: { _id: { $in: [...Array.from(req.body.actors).map(id => ToObjectId(id))] } } }, ...joinoptions]
        )
        return res.status(StatusCode.OK).json({ allmoviesidbyactor, ok: true })

    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}





module.exports = { InssertActor, GetMoviesByActor, GetAllActors, GetActor, GetMoviesByActors }