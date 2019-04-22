const express = require('express');
const router = express.Router();
const Maintain = require('../model/maintain')

router.post('/maintain/list', function (req, res, next) {
    Maintain.list(req, res, next)
})
router.get('/maintain/remove', function (req, res, next) {
    Maintain.remove(req, res, next)
});
router.get('/maintain/single', function (req, res, next) {
    Maintain.single(req, res, next)
});
router.post('/maintain/update', function (req, res, next) {
    Maintain.update(req, res, next)
});
module.exports = router