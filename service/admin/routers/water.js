const express = require('express');
const router = express.Router();
const Water = require('../model/water')

router.post('/water/list', function (req, res, next) {
    Water.list(req, res, next)
});
router.get('/water/remove', function (req, res, next) {
    Water.remove(req, res, next)
});
router.get('/water/single', function (req, res, next) {
    Water.single(req, res, next)
});
router.post('/water/update', function (req, res, next) {
    Water.update(req, res, next)
});
module.exports = router