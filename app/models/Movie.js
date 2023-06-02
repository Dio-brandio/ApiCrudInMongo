const mongoose = require("mongoose");
const MovieSchema = mongoose.Schema(
    {
        name: String,
        release_date: Date,
        actors_id: [{ type: mongoose.Types.ObjectId, ref: 'actor' }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("movie", MovieSchema);


// {
//     "name": "JoJo's Bizzare Adventure",
//     "release_date": "2012-10-10",
//     "actors_id": ["64799759f03b33902a18e9e1","64799799dda8aac74bd65dee"],
// }