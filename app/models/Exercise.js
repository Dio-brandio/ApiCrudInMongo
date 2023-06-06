const mongoose = require("mongoose");
const ExerciseSchema = mongoose.Schema(
    {
        bodyPart:String,
        equipment:String,
        gifUrl:String,
        id:String,
        name:String,
        target:String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
