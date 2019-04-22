const express = require('express');
const router = express.Router();
const Student = require('../model/student')

router.post('/student/create', function (req, res, next) {
    Student.create(req, res, next)
});
router.post('/student/list', function (req, res, next) {
    Student.list(req, res, next)
});
router.get('/student/remove', function (req, res, next) {
    Student.remove(req, res, next)
});
router.get('/student/single', function (req, res, next) {
    Student.single(req, res, next)
});
router.post('/student/update', function (req, res, next) {
    Student.update(req, res, next)
});
module.exports = router