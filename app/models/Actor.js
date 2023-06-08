const mongoose = require("mongoose");

const ActorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female','Other'],
            required:true
        }
    },
    { timestamps: true }
);




module.exports = mongoose.model("actor", ActorSchema);