const express = require('express');
const router = express.Router();
const Electricity = require('../model/electricity')

router.post('/electricity/list', function (req, res, next) {
    Electricity.list(req, res, next)
});
module.exports = router