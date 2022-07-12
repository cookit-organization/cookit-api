const express = require('express')
const mongoose = require('mongoose')
const recipe = require('./recipes')
const user = require('./users')
const uploadImage = require('../public/javascripts/upload-image')
const deleteImage = require('../public/javascripts/delete-image')
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const indexRouter = express.Router()
const userRouter = express.Router()
const recipeRouter = express.Router()

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
indexRouter.get('/upload', uploadImage('1mlqujDjrQktgYRvSXt8IGy1Kh4Hi66wg', fs.createReadStream(path.join(__dirname, '../images/background.jpg'))));
indexRouter.get('/delete', deleteImage(/* imageId */));

//users
userRouter.post('/new-user', user.newUser)   // localhost:3000/users/new-user

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
