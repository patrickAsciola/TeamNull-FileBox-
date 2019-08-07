var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).render("unauthenticated");
  }
  next();
}

/* Router Pages */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var dashboardRouter = require('./routes/dashboard');
var documentRouter = require('./routes/document');
var friendsRouter = require('./routes/friends');
var groupsRouter = require('./routes/groups');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', loginRequired, dashboardRouter);
app.use('/friends', friendsRouter);
app.use('/account', accountRouter);
app.use('/groups', groupsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/document', documentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
