const express = require('express');
const router = express.Router();
const Article = require('../model//article')

router.post('/article/list', function (req, res, next) {
    Article.newsList(req, res, next)
});
module.exports = router