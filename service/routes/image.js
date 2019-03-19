const express = require('express');
const router = express.Router();
const Image = require('../model/image')
/**
 * 登录后台的路由控制接口
 */
router.post('/uploadImg', function (req, res, next) {
    Image.uploadImg(req, res, next);
});

module.exports = router