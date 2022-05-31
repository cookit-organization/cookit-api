const mongoose = require('mongoose')

module.exports =  mongoose.model("Recipe", mongoose.Schema({
    author_username: String,
    recipe: {
        name: String,
        preparation_time: String,
        description: String,
        image: Buffer,
        tags: Array,
        meal_time: Array,
        components: Array,
        average_rate: Number,
        rates_number: Number
    }
}), "recipes")
