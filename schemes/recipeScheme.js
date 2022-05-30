const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    author_username: String,
    recipe: {
        name: String,
        preparation_time: String,
        description: String,
        image: Buffer,
        tags: Array,
        components: Array,
        meal_time: String,
        average_rate: Number,
        rates_number: Number
    }
})
