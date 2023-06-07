
const fs = require('fs')
const Movie = require('../app/models/Movie')

async function SeedMovie() {
    const moviecount = await Movie.countDocuments()
    if (moviecount ===0) {
        const moviedata = JSON.parse(fs.readFileSync("./config/moviedata.json", "utf-8"))
        await Movie.insertMany(moviedata)
        console.log("Movie data seeded")
    }
}


module.exports = { SeedMovie }



