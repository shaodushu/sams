const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

//session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config')
const sessionStore = new MySQLStore(config.mysql)
app.use(session({
  key: 'shaodushu', //自行设置密钥
  secret: '123456', //私钥
  cookie: {
    maxAge: 60000 //最大生命期
  },
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))
/**
 * 跨域
 * 只有本地8080/8081可以访问
 */
const corsOptions = {
  origin: ['http://localhost:8080', 'http://192.168.1.248:8080', 'http://192.168.0.3:8080'],
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

app.use(express.static(path.join(__dirname, 'public')));


let Admin = [
  require('./admin/routers/login'),
  require('./admin/routers/user'),
  require('./admin/routers/apartment'),
  require('./admin/routers/files'),
  require('./admin/routers/admin'),
  require('./admin/routers/student'),
  require('./admin/routers/water'),
  require('./admin/routers/electricity'),
  require('./admin/routers/repair'),
  require('./admin/routers/maintain')
]
let Custom = [
  require('./custom/routers/user'),
  require('./custom/routers/water'),
  require('./custom/routers/electricity'),
  require('./custom/routers/visitors'),
  require('./custom/routers/maintain'),
  require('./custom/routers/files'),
  require('./custom/routers/apartment')
]
app.use('/admin', [...Admin]);
app.use('/custom', [...Custom]);

app.use(cookieParser());

//catch 403 and forward to error handler
// app.use(function (req, res, next) {
//   if (['/custom/user/login', '/admin/user/login'].indexOf(req.path) > -1) {
//     next()
//   } else {
//     try {
//       let session =  operation.asyncHandleGetSession(sessionStore, headers.cookie)
//       userinfo = JSON.parse(session)
//     } catch (error) {
//       next(createError(403));
//     }
//   }
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// catch 401 and forward to error handler
app.use(function (req, res, next) {
  next(createError(401));
});

// // catch 500 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(500));
// });

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