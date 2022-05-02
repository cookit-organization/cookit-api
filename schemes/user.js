const mongoose = require('mongoose')

module.exports = mongoose.model("User", mongoose.Schema({
    profile: {
        name: String,
        // image: Buffer,
        bio: String,
        rate: Number
    },
    private_info: {
        email: String,
        username: String,
        password: String
    },
    recipes: {
        his: Array,
        saved: Array,
        favorite: Array
    }
}), "users") 