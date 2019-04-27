const express = require('express');
const router = express.Router();
const Visitors = require('../model/visitors')

router.post('/visitors/create', function (req, res, next) {
    Visitors.create(req, res, next)
});

router.get('/visitors/queryQrCode', function (req, res, next) {
    Visitors.queryQrCode(req, res, next)
});

module.exports = router