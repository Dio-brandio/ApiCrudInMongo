const mongoose = require("mongoose");
const MovieSchema = mongoose.Schema(
    {
        name: String,
        release_date: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("movie", MovieSchema);

