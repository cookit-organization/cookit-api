const mongoose = require('mongoose')

module.exports =  mongoose.model("Recipe", mongoose.Schema({
    author_name: String,
    author_username: String, // RSA it
    recipe: {
        name: String,
        preparation_time: String,
        description: String,
        image: Buffer,
        tags: Array,
        meal_time: Array,
        components: Array,
        average_rate: Number,
        rates_number: Number,
        users_who_vote: [{ user_id: String, rate: Number }]
    }
}), "recipes")
