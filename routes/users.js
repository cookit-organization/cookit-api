const User = require('../schemes/user')


function newUser(req, res) {

    new User({
        profile: {
            name: req.query.name,
            // image: Buffer, // check how to implement this functionality
            bio: req.query.bio,
            rate: 0
        },
        private_info: {
            email: req.query.email,
            // username: req.query.username,
            password: req.query.password
        },
        recipes: {
            his: [], 
            saved: [],
            favorite: []
        }
    })
}

function updateUser(req, res) {}

function deleteUser(req, res) {}

function getUsers(req, res) {}

function getUserByUsername(req, res) {}

function logInUser(req, res) {}

module.exports = {
    newUser, 
    updateUser,
    deleteUser,
    getUsers,
    getUserByUsername,
    logInUser
}