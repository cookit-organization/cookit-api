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

const upload = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/tmp/')
  },
  filename: function (req, file, cb) {   
    cb(null, file.filename + '.jpg')
  }
}) })

// routes

const indexRouter = express.Router();
const userRouter = express.Router();
const recipeRouter = express.Router();


indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookit Server' });
});

//users
userRouter.post('/new-user', user.newUser)

userRouter.put('/update-user', user.updateUser)

userRouter.delete('/delete-user', user.deleteUser)

userRouter.get('/get-users', user.getUsers) // for admin only

userRouter.get('/get-user', user.getUserByUsername)

userRouter.post('/log-in-user', user.logInUser)

//recipes
recipeRouter.post('/new-recipe', upload.single('image'), (req, res) => {
  recipe.newRecipe(req,res,req.file.filename)
})

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
