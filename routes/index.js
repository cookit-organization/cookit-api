const express = require('express')
const mongoose = require('mongoose')
const recipe = require('./recipes')
const user = require('./users')
const google_drive = require('../public/javascripts/google-drive')

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

// indexRouter.get('/test', google_drive.uploadImage);

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
