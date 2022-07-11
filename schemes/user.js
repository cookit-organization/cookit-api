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

//later change to link in google drive where the image will be stored
userScheme.virtual('ProfileImage').get(function() {
    var image = userScheme.profile.image;
    if (image != null && image != "") {
        return image;
    } else {
        return path.join('/images', 'default_profile_picture.jpg');
    }
});

module.exports = mongoose.model("User", userScheme, "users");