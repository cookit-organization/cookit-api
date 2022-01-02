const express = require('express')
const mongoose = require('mongoose')
const package = require('../package.json')
const indexRouter = express.Router()
const userRouter = express.Router()
const recipeRouter = express.Router()

const recipe = require('./recipeFunc')
const user = require('./userFunc')

mongoose.connect('mongodb://'+ package['mongodb-info'].name+ ':'+ package['mongodb-info'].password +'@cookit.aeo8r.mongodb.net/cookit-database?retryWrites=true&w=majority')
.then(()=> console.log('connected to database'))
.catch((error)=> {console.log(error)})


indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//user
userRouter.post('/new-user', user.newUser)

userRouter.put('/update-user', user.updateUser)

userRouter.delete('/delete-user', user.deleteUser)

userRouter.get('/get-users', user.getUsers)

userRouter.get('/get-user-by-username', user.getUserByUsername)

userRouter.get('/log-in-user', user.logInUser)

//recipe
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
