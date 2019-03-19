const express = require('express');
const router = express.Router();
const Admin = require('../model/admin')

router.post('/admin/create', function (req, res, next) {
    Admin.create(req, res, next)
});
router.post('/admin/list', function (req, res, next) {
    Admin.list(req, res, next)
});
module.exports = router