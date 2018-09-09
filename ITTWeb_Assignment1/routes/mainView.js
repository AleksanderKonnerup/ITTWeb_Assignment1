var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainView', { title: 'ITTWeb_FitnessApp_group2' });
});

module.exports = router;