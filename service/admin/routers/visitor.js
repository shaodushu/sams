const express = require('express');
const router = express.Router();
const Visitor = require('../model/visitor')

router.post('/visitor/list', function (req, res, next) {
    Visitor.list(req, res, next)
});

module.exports = router