const express = require('express');
const routerAdmin = express.Router();
const routerCustom = express.Router();
const Electricity = require('../model/electricity')

routerAdmin.post('/electricity/list', function (req, res, next) {
    Electricity.list(req, res, next)
});
module.exports = {
    routerAdmin,
    routerCustom
}