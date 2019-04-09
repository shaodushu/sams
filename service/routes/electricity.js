const express = require('express');
const routerAdmin = express.Router();
const routerCustom = express.Router();
const Electricity = require('../model/electricity')

routerAdmin.post('/electricity/list', function (req, res, next) {
    Electricity.list(req, res, next)
});
routerCustom.get('/electricity/list', function (req, res, next) {
    Electricity.listByOpenid(req, res, next)
})
module.exports = {
    routerAdmin,
    routerCustom
}