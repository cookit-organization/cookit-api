const express = require('express')
const mongoose = require('mongoose')
const package = require('../package.json')
const recipe = require('./recipeFunc')
const user = require('./userFunc')

const indexRouter = express.Router()
const userRouter = express.Router()
const recipeRouter = express.Router()

mongoose.connect('mongodb://'+ package['mongodb-info'].name+ ':'+ package['mongodb-info'].password +'@cookit.aeo8r.mongodb.net/cookit-database?retryWrites=true&w=majority')
.then(()=> console.log('connected to database'))
.catch((error)=> {console.log(error)})


indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookit Server' });
});

//users
userRouter.post('/new-user', user.newUser)

userRouter.put('/update-user', user.updateUser)

userRouter.delete('/delete-user', user.deleteUser)

userRouter.get('/get-users', user.getUsers) // for admin only

userRouter.get('/get-user', user.getUserByUsername)

userRouter.get('/log-in-user', user.logInUser)

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
