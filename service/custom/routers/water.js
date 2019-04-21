const express = require('express');
const router = express.Router();
const Water = require('../model/water')

router.get('/water/list', function (req, res, next) {
    Water.listByOpenid(req, res, next)
})
module.exports = router