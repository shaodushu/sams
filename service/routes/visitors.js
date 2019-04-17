const express = require('express');
const routerAdmin = express.Router();
const routerCustom = express.Router();
const Visitors = require('../model/visitors')

routerCustom.post('/visitors/create', function (req, res, next) {
    Visitors.create(req, res, next)
});

routerCustom.get('/visitors/queryQrCode', function (req, res, next) {
    Visitors.queryQrCode(req, res, next)
});

module.exports = {
    routerAdmin,
    routerCustom
}