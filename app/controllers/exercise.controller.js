const Exercise = require("../models/Exercise")
const StatusCode = require("../constraints/response-codes");


async function GetAllExercise(req, res) {
    try {
        let current_page_number = Number.parseInt(req.query.page && req.query.page != null ? req.query.page : 0);
        let no_of_docs_each_page = Number.parseInt(req.query.limit && req.query != null ? req.query.limit : 5);
        const matchfilter =  req.query.catagory && req.query.catagory != null ? { bodyPart: req.query.catagory } : null

        const allex = await Exercise.aggregate([
            {$match:matchfilter},
            { $skip: no_of_docs_each_page * current_page_number },
            { $limit: no_of_docs_each_page }
        ]);
return res.status(StatusCode.OK).json({ count: allex.length, pageno: current_page_number, exercises: allex, ok: true })
    } catch (err) {
    return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
}
}

module.exports = { GetAllExercise }