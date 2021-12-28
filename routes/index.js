const express = require('express');
const indexRouter = express.Router();
const userRouter = express.Router();
const recipeRouter = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = {
  indexRouter,
  userRouter,
  recipeRouter
}
