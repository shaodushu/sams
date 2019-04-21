const express = require('express');
const router = express.Router();
const Login = require('../model/login')
/**
 * 登录后台的路由控制接口
 */
router.post('/authLogin', function (req, res, next) {
    Login.authLogin(req, res, next);
});
router.get('/userInfo', function (req, res, next) {
    Login.userInfo(req, res, next)
});
router.get('/logout', function (req, res, next) {
    res.send(200, null)
});

module.exports = router