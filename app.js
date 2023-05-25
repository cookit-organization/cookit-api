const rateLimit = require('express-rate-limit').default;
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const Router = require('./routes/index');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(favicon(__dirname + '/public/images/cookit_logo.jpg'));


app.use('/', Router.indexRouter);
app.use('/users', Router.userRouter);
app.use('/recipes', Router.recipeRouter);

app.use(
  rateLimit ({
  windowMs: 60 * 1000,
  max: 5,
  handler: function (req, res) {
    return res.status(429).json({
      error: 'You sent too many requests. Please wait a while then try again'
    })
  }
}));

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.status === 404) {
    res.render('common-errors', {title: "404", error: "404 | Not Found"});
  }

  if(err.status === 403) {
    res.render('common-errors', {title: "403", error: "403 | Forbidden"});
  }

  res.status(err.status || 500); 
  res.render('error', {title: "Error!"}, {error: err});
});

module.exports = app;
