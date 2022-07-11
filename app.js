const rateLimit = require('express-rate-limit').default;
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const Router = require('./routes/index');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.disable('x-powered-by')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(__dirname + '/public/images/cookit_logo.jpg'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));

//routers
app.use('/', Router.indexRouter);
app.use('/users', Router.userRouter);
app.use('/recipes', Router.recipeRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

//request limiter : needs a test
app.use(
    rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    handler: function (req, res) {
      return res.status(429).json({
        error: 'You sent too many requests. Please wait a while then try again'
      })
    }
  })
 );

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.status === 404) {
    res.render('404', {title: "404"});
  }

  // render the error page
  res.status(err.status || 500); 
  res.render('error', {title: "Error!"}, {error: err});
});

module.exports = app;
