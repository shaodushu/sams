const express = require('express');
const routerAdmin = express.Router();
const routerCustom = express.Router();
const Repair = require('../model/repair')

routerAdmin.post('/repair/create', function (req, res, next) {
    Repair.create(req, res, next)
});
routerAdmin.post('/repair/list', function (req, res, next) {
    Repair.list(req, res, next)
});
module.exports = {
    routerAdmin,
    routerCustom
}