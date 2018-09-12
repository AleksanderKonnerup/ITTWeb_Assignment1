var express = require('express');
var router = express.Router();
const Exercise_controller = require('../controllers/exercise.controller');

router.post('/create', Exercise_controller.create);
router.post('/remove', Exercise_controller.remove);
router.get('/', Exercise_controller.getAllExercises);
router.get('/', function(req,res, next){
  res.render('mainView', { title: 'ITTWeb_FitnessApp_group2' })
});

module.exports = router;