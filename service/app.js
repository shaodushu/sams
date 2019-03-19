const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const apartmentRouter = require('./routes/apartment');
const imageRouter = require('./routes/image')
const adminRouter = require('./routes/admin')
const studentRouter = require('./routes/student')
const waterRouter = require('./routes/water')
const app = express();

/**
 * 跨域
 * 只有本地8080/8081可以访问
 */
const corsOptions = {
  origin: ['http://localhost:8080'],
  optionsSuccessStatus: 200
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let Test = [
  indexRouter
]

let Admin = [
  loginRouter,
  userRouter,
  apartmentRouter,
  imageRouter,
  adminRouter,
  studentRouter.routerAdmin,
  waterRouter.routerAdmin
]

app.use('/test', [...Test]);
app.use('/admin', [...Admin]);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// catch 401 and forward to error handler
app.use(function (req, res, next) {
  next(createError(401));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;