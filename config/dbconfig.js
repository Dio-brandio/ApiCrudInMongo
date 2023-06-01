const mongoose = require("mongoose");


try {
    mongoose.connect(process.env.DB_URL).then(()=>console.log("connected successfully"))
} catch (error) {
    console.log(error);
}


module.exports = mongoose