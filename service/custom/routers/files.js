const express = require('express');
const router = express.Router();
const Files = require('../model/files')

router.post('/file/uploadImg', function (req, res, next) {
    Files.uploadImg(req, res, next);
});

module.exports = router