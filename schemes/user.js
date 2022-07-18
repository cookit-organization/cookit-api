const mongoose = require('mongoose')
const path = require('path');

var userScheme = mongoose.Schema({
    profile: {
        name: String,
        image: String,
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
        favorite: Array,
    }
})

userScheme.virtual('ProfileImage').get(function() {
    var image = userScheme.profile.image;
    if (image != null && image != "") {
        return image;
    } else {
        return "16zNamLirRSpuowSlgHv9T_s3O2vtbO0C"; //default profile image from google drive 
    }
});

module.exports = mongoose.model("User", userScheme, "users");