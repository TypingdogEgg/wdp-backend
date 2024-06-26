var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors')
const {expressjwt} = require('express-jwt')
const config  = require('./config/index.js')
var app = express();
const port = 3303;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(expressjwt({ secret: config.secretKey,algorithms:config.algorithms }).unless({path: [/^\/api\/users/,/^\/api\/data/] }))

app.use('/api/data', indexRouter);
app.use('/api/users', usersRouter);

// 监听3303端口
app.listen(port, () => {
  console.log(`正在监听： ${port}`)
})
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
