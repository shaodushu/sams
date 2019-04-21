const express = require('express');
const router = express.Router();
const Electricity = require('../model/electricity')

router.get('/electricity/list', function (req, res, next) {
    Electricity.listByOpenid(req, res, next)
})

module.exports = router