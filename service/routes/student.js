const express = require('express');
const routerAdmin = express.Router();
const routerCustom = express.Router();
const Student = require('../model/student')

routerAdmin.post('/student/create', function (req, res, next) {
    Student.create(req, res, next)
});
routerAdmin.post('/student/list', function (req, res, next) {
    Student.list(req, res, next)
});
module.exports = {
    routerAdmin,
    routerCustom
}