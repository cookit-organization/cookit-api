const User = require('../schemes/user')
const rsa = require('../cryptography/rsa')

const sanitize = require('mongo-sanitize');

function newUser(req, res) {

    //decrypt username, password  and email with RSA 
    
    try{
        // let username = rsa.decrypt(req.query.username)
        // let password = rsa.decrypt(req.query.password)
        // let email = rsa.decrypt(req.query.email)

        let username = req.query.username
        let password = req.query.password
        let email = req.query.email

        new User({
            profile: {
                name: sanitize(req.query.name),
                //image: req.query.image, // check how to implement this functionality
                bio: sanitize(req.query.bio),
                rate: 0
            },
            private_info: {
                email:  sanitize(email),
                username: sanitize(username),
                password: sanitize(password)
            },
            recipes: {
                his: [], 
                saved: [],
                favorite: []
            }
        }).save()
        .then((result) => {
            console.log("response :\n" + result)
            res.status(200).send(null)
        })
        .catch((error) => console.log("error : " + error))
    }catch{
        console.error("[ERROR]: RSA did not decrypt")
        res.status(403).json({error:"RSA did not decrypt"})
    }
}

function updateUser(req, res) {}

function deleteUser(req, res) {
    
    User.findOneAndDelete(sanitize(req.body.id))
        .then((user) => {
            res.status(200).send({message: "user has been deleted successfully!"})
            console.log(user)
        })
        .catch((error)=>{
            console.log(error.message)
        })    
}

function getUsers(req, res) {

    User.find()
    .then((result) => {
        res.status(200).send(result)
        console.log(result)
    }).catch((error) => console.log(error))
}

function getUserByUsername(req, res) {
    
    User.findOne({username: sanitize(req.query.username)})
    .then((user) => {
        res.status(200).send(user)
        console.log(user)
    }).catch((error) => console.log(error))
}

function logInUser(req, res) {

   //should send encrypted with RSA 

   var username = sanitize(req.query.username);
   var password = sanitize(req.query.password);

   User.findOne({username: username}, (err, user) => {

    if(user.private_info.username == username && user.private_info.password == password){
        res.status(200).send(null)
        console.log(user)
    }else{
        res.status(403).send({"error : ": err})
    }

   }).catch((error) => console.log(error))

}

module.exports = {
    newUser, 
    updateUser,
    deleteUser,
    getUsers,
    getUserByUsername,
    logInUser
}