const express = require('express');
const router = express.Router();
const Repair = require('../model/repair')

router.post('/repair/create', function (req, res, next) {
    Repair.create(req, res, next)
});
router.post('/repair/list', function (req, res, next) {
    Repair.list(req, res, next)
});
module.exports = router