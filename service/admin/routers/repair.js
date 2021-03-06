const express = require('express');
const router = express.Router();
const Repair = require('../model/repair')

router.post('/repair/create', function (req, res, next) {
    Repair.create(req, res, next)
});
router.post('/repair/list', function (req, res, next) {
    Repair.list(req, res, next)
});
router.get('/repair/remove', function (req, res, next) {
    Repair.remove(req, res, next)
});
router.get('/repair/single', function (req, res, next) {
    Repair.single(req, res, next)
});
router.post('/repair/update', function (req, res, next) {
    Repair.update(req, res, next)
});
module.exports = router