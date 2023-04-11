const express = require('express');
const recipe = require('./recipes');
const user = require('./users');
require('dotenv').config();

// mongoose (mongoDB library)
const mongoose = require('mongoose');

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


// multer (for images)
const multer  = require('multer')

const upload = multer()

// routes

const indexRouter = express.Router();
const userRouter = express.Router();
const recipeRouter = express.Router();


indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookit Server' });
});


indexRouter.post('/login', user.logInUser)

//users
userRouter.post('/', user.newUser)
userRouter.put('/', user.updateUser)
userRouter.delete('/', user.deleteUser)
userRouter.get('/', user.getUserByUsername)
userRouter.get('/get-users', user.getUsers) // for admin only

//recipes

recipeRouter.post('/', upload.single('image'), (req, res) => {
  recipe.newRecipe(req, res, req.file);
})
recipeRouter.put('/', recipe.updateRecipe)
recipeRouter.delete('/', recipe.deleteRecipe)
recipeRouter.get('/random-recipes', recipe.recipesByDayState)
recipeRouter.get('/by-tag', recipe.recipesByTag)
recipeRouter.get('/by-name', recipe.recipesByName)

module.exports = {
  indexRouter,
  userRouter,
  recipeRouter
}
