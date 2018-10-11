const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(process.env);
});

router.get('/tag', function(req, res, next) {
  res.send('tag');
});

module.exports = router;
