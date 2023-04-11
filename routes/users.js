const User = require("../schemes/user");
const sanitize = require("mongo-sanitize");
const driveActions = require("../public/javascripts/google-drive-actions");

const profileImages = "1Nuy5s8VBBlKMZC2DvB9Xq6B3jU1WN8oQ";

function newUser(req, res) {
  /* 
        decrypt username, password and email with RSA 
        var username = rsa.decrypt(req.query.username)
        var password = rsa.decrypt(req.query.password)
        var email = rsa.decrypt(req.query.email) 
        */

  var username = req.query.username;
  var password = req.query.password;
  var email = req.query.email;

  //if image is null, the user did'nt upload an image therefore you need to give default image.

  var uploadImage = driveActions.uploadImage(profileImages, req.query.image);

  uploadImage
    .then((resImage) => {
      new User({
        profile: {
          name: sanitize(req.query.name),
          image: resImage.data["id"] /* this is image id */,
          bio: "",
          rate: 0,
        },
        private_info: {
          email: sanitize(email),
          username: sanitize(username),
          password: sanitize(password),
        },
        recipes: {
          his: [],
          saved: [],
          favorite: [],
        },
      })
        .save()
        .then((result) => {
          console.log("response :\n" + result);
          res.status(200).send(null);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function updateUser(req, res) {}

function deleteUser(req, res) {
  User.findOneAndDelete(sanitize(req.body.id))
    .then((user) => {
      res.status(200).send({ message: "user has been deleted successfully!" });
      console.log(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//admin only
function getUsers(req, res) {
  User.find()
    .then((result) => {
      res.status(200).send(result);
      console.log(result);
    })
    .catch((error) => console.log(error));
}

function getUserByUsername(req, res) {
  User.findOne({ username: sanitize(req.query.username) })
    .then((user) => {
      res.status(200).send(user);
      console.log(user);
    })
    .catch((error) => console.log(error));
}

function logInUser(req, res) {
  //should send encrypted with RSA

  var username = sanitize(req.query.username);
  var password = sanitize(req.query.password);

  User.findOne({ username: username }, (err, user) => {
    if (
      user.private_info.username == username &&
      user.private_info.password == password
    ) {
      res.status(200).send(null);
      console.log(user);
    } else {
      res.status(403).send({ "error : ": err });
    }
  }).catch((error) => console.log(error));
}

module.exports = {
  newUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByUsername,
  logInUser,
};
