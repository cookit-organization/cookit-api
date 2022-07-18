const express = require('express');
const mongoose = require('mongoose');
const recipe = require('./recipes');
const user = require('./users');
const driveActions = require('../public/javascripts/google-drive-actions');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const indexRouter = express.Router();
const userRouter = express.Router();
const recipeRouter = express.Router();

mongoose.connect(
  process.env.DBURL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log('Mongoose is connected');
  },
);  

indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookit Server' });
});

//testing 
indexRouter.get('/upload', (req, res)=> {
  var request = driveActions.uploadImage(['1mlqujDjrQktgYRvSXt8IGy1Kh4Hi66wg'], fs.createReadStream(path.join(__dirname, '../public/images/cookit_logo.jpg')))
  request.then(response => {
    var imageId = response.data['id'] /* this is image id */
  }).catch(err => console.log(err))
});

indexRouter.get('/get', function (req, res, next) {
  var image = driveActions.getImage("1OL60al05Lmh0s8QT2zRFNCUorGN69An8") 
  image.then(response => {
    var imageType = response.headers['content-type'];
    var base64 = Buffer.from(response.data, 'utf8').toString('base64');
    var dataURI = 'data:' + imageType + ';base64,' + base64;
    res.render('show-image', {title: "image", imageUrl: dataURI})
  })
})

//users
userRouter.post('/new-user', user.newUser)

userRouter.put('/update-user', user.updateUser)

userRouter.delete('/delete-user', user.deleteUser)

userRouter.get('/get-users', user.getUsers) // for admin only

userRouter.get('/get-user', user.getUserByUsername)

userRouter.post('/log-in-user', user.logInUser)

//recipes
recipeRouter.post('/new-recipe', recipe.newRecipe)

recipeRouter.put('/update-recipe', recipe.updateRecipe)

recipeRouter.delete('/delete-recipe', recipe.deleteRecipe)

recipeRouter.get('/random-recipes', recipe.randomRecipes)

recipeRouter.get('/recipes-by-tag', recipe.recipesByTag)

recipeRouter.get('/recipe-by-name', recipe.recipesByName)

module.exports = {
  indexRouter,
  userRouter,
  recipeRouter
}
