const express = require('express');
const routerAdmin = express.Router();
const routerCustom = express.Router();
const Water = require('../model/water')

routerAdmin.post('/water/importWater', function (req, res, next) {
    Water.importWater(req, res, next)
});
routerAdmin.post('/water/list', function (req, res, next) {
    Water.list(req, res, next)
});
module.exports = {
    routerAdmin,
    routerCustom
}