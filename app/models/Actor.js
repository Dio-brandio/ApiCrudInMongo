const mongoose = require("mongoose");

const ActorSchema = mongoose.Schema(
    {
        name: String,
        gender: String
    },
    { timestamps: true }
);




module.exports = mongoose.model("actor", ActorSchema);