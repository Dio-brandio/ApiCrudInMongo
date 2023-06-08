const mongoose = require("mongoose");
const ExerciseSchema = mongoose.Schema(
    {
        bodyPart:{type:String,required:true},
        equipment:{type:String,required:true},
        gifUrl:{type:String,required:true},
        id:Number,
        name:{type:String,required:true},
        target:{type:String,required:true},
    },
    { timestamps: true }
);
ExerciseSchema.index({
    bodyPart: "text",
    name: "text",
    equipment: "text",
    target: "text"
})

// ExerciseSchema.pre('insert', function() {

//   });
  
module.exports = mongoose.model("Exercise", ExerciseSchema);


