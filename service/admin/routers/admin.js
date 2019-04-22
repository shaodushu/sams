const express = require('express');
const router = express.Router();
const Admin = require('../model/admin')

router.post('/admin/create', function (req, res, next) {
    Admin.create(req, res, next)
});
router.post('/admin/list', function (req, res, next) {
    Admin.list(req, res, next)
});
router.get('/admin/remove', function (req, res, next) {
    Admin.remove(req, res, next)
});
router.get('/admin/single', function (req, res, next) {
    Admin.single(req, res, next)
});
router.post('/admin/update', function (req, res, next) {
    Admin.update(req, res, next)
});
module.exports = router