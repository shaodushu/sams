const express = require('express');
const router = express.Router();
const Files = require('../model/files')
/**
 * 登录后台的路由控制接口
 */
router.post('/file/uploadImg', function (req, res, next) {
    Files.uploadImg(req, res, next);
});

router.post('/file/importWater', function (req, res, next) {
    Files.importWater(req, res, next);
});
router.post('/file/importElectricity', function (req, res, next) {
    Files.importElectricity(req, res, next)
})
module.exports = router