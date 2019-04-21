const express = require('express');
const router = express.Router();
const Water = require('../model/water')

router.post('/water/list', function (req, res, next) {
    Water.list(req, res, next)
});
module.exports = router