const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const operation = require('./libs/operation')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const apartmentRouter = require('./routes/apartment');
const filesRouter = require('./routes/files')
const adminRouter = require('./routes/admin')
const studentRouter = require('./routes/student')
const waterRouter = require('./routes/water')
const electricityRouter = require('./routes/electricity')
const repairRouter = require('./routes/repair')
const visitorsRouter = require('./routes/visitors')

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

let Test = [
  indexRouter
]

let Admin = [
  loginRouter,
  userRouter.routerAdmin,
  apartmentRouter,
  filesRouter,
  adminRouter,
  studentRouter.routerAdmin,
  waterRouter.routerAdmin,
  electricityRouter.routerAdmin,
  repairRouter.routerAdmin
]
let Custom = [
  userRouter.routerCustom,
  waterRouter.routerCustom,
  electricityRouter.routerCustom,
  visitorsRouter.routerCustom
]
app.use('/test', [...Test]);
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