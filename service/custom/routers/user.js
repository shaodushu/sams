const express = require('express');
const router = express.Router();
const User = require('../model/user')

router.post('/user/login', function (req, res, next) {
    User.login(req, res, next)
});

router.post('/user/bound', function (req, res, next) {
    User.bound(req, res, next)
});

router.get('/user/bound/remove', function (req, res, next) {
    User.remove(req, res, next)
});

module.exports = router