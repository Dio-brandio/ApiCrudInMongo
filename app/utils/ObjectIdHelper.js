const mongoose = require("mongoose")

function CheckValidId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}
function ToObjectId (id) {
    return new mongoose.Types.ObjectId(id)
}
module.exports={CheckValidId,ToObjectId}