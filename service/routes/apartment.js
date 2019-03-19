const express = require('express');
const router = express.Router();
const Apartment = require('../model/apartment')

router.post('/apartment/create', function (req, res, next) {
    Apartment.create(req, res, next)
});
router.post('/apartment/update', function (req, res, next) {
    Apartment.update(req, res, next)
});
router.post('/apartment/list', function (req, res, next) {
    Apartment.list(req, res, next)
});
module.exports = router