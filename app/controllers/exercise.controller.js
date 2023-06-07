const Exercise = require("../models/Exercise")
const StatusCode = require("../constraints/response-codes");


async function GetAllExercise(req, res) {
    try {
        let current_page_number = Number.parseInt(req.query.page && req.query.page != null ? req.query.page : 1);
        let no_of_docs_each_page = Number.parseInt(req.query.limit && req.query != null ? req.query.limit : 5);
        const catagoryfilter = req.query.catagory && req.query.catagory != null ? { bodyPart: { $in: req.query.catagory.split(',') } } : {}
        const searchfilter = req.query.q && req.query.q != null ? { $text: { $search: req.query.q }  } : {}

        // await Exercise.updateMany({}, [{ $set: { "id": { $toDouble: "$id" } }}])

        const sortfield = req.query.sort && null;
        if (sortfield) {
            sortfield[`${req.query.sort}`] = 1
        }
    
        
        const allex = await Exercise.find({...catagoryfilter,...searchfilter}).sort(sortfield).skip(no_of_docs_each_page * (current_page_number-1)).limit(no_of_docs_each_page)

        const count = await Exercise.find({...catagoryfilter,...searchfilter}).countDocuments();
        return res.status(StatusCode.OK).json(
            {
                totalRecords: count,
                pageno: current_page_number,
                totalpages: Math.ceil(count / no_of_docs_each_page),
                exercises: allex, ok: true
            }

        )
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

module.exports = { GetAllExercise }