const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/message/count', function (req, res, next) {
  res.send(200, 3)
});
module.exports = router