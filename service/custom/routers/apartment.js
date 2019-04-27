const express = require('express');
const router = express.Router();
const Apartment = require('../model/apartment')

router.get('/apartment/single', function (req, res, next) {
    Apartment.single(req, res, next)
});
module.exports = router