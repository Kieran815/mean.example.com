var express = require('express');
var router = express.Router();

router.get('/app', function (req, res, next) {
  res.render('articles/app', { title: 'Article Management' });
});

module.exports = router;