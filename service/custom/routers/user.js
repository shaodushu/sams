const express = require('express');
const router = express.Router();
const User = require('../model/user')
const Water = require('../model/water')
const Electro = require('../model/electricity')
const tools = require('../../libs/tool')

router.post('/user/login', function (req, res, next) {
    User.login(req, res, next)
});

router.post('/user/bound', function (req, res, next) {
    User.bound(req, res, next)
});

router.get('/user/bound/remove', function (req, res, next) {
    User.remove(req, res, next)
});

router.post('/user/report', function (req, res, next) {
    let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { useType } = param;
    if (useType === 'water') {
        Water.create(req, res, next)
    } else if (useType === 'electro') {
        Electro.create(req, res, next)
    } else {
        res.status(500).send({ msg: '参数错误' })
    }
});

module.exports = router