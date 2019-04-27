const express = require('express');
const router = express.Router();
const Electricity = require('../model/electricity')

router.post('/electricity/list', function (req, res, next) {
    Electricity.list(req, res, next)
});
router.get('/electricity/remove', function (req, res, next) {
    Electricity.remove(req, res, next)
});
router.get('/electricity/single', function (req, res, next) {
    Electricity.single(req, res, next)
});
router.post('/electricity/update', function (req, res, next) {
    Electricity.update(req, res, next)
});
module.exports = router