const mongoose = require("mongoose");
const ExerciseSchema = mongoose.Schema(
    {
        bodyPart:String,
        equipment:String,
        gifUrl:String,
        id:Number,
        name:String,
        target:String,
    },
    { timestamps: true }
);
ExerciseSchema.index({
    bodyPart: "text",
    name: "text",
    equipment: "text",
    target: "text"
})

// ExerciseSchema.pre('find', function() {
//     // console.log(this.schema ); // true
//     // this.start = Date.now();
//   });
  
module.exports = mongoose.model("Exercise", ExerciseSchema);


