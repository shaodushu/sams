const express = require('express');
const routerAdmin = express.Router();
const routerCustom = express.Router();
const User = require('../model/user')

/* GET users listing. */
routerAdmin.get('/message/count', function (req, res, next) {
  res.send(200, 3)
});

routerCustom.post('/user/login', function (req, res, next) {
  User.login(req, res, next)
});
module.exports = {
  routerAdmin,
  routerCustom
}