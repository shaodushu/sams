const express = require('express');
const router = express.Router();
const Login = require('../model/login')
/**
 * 登录后台的路由控制接口
 */
router.post('/authLogin', function (req, res, next) {
    Login.authLogin(req, res, next);
});
router.get('/get_info', function (req, res, next) {
    res.send(200, {
        name: 'super_admin',
        user_id: '1',
        access: ['super_admin', 'admin'],
        token: 'super_admin',
        avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    })
});
router.get('/logout', function (req, res, next) {
    res.send(200, null)
});

module.exports = router