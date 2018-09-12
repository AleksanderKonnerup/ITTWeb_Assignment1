var express = require('express');
var router = express.Router();
const Exercise_controller = require('../controllers/exercise.controller');

router.post('/createExercise', Exercise_controller.createExercise);
router.post('/removeExercise', Exercise_controller.removeExercise);
router.post('/removeWorkout', Exercise_controller.removeWorkout);
router.post('/selectWorkOut', Exercise_controller.selectWorkOut);
router.post('/createWorkoutProgram', Exercise_controller.createWorkoutProgram);
router.get('/', Exercise_controller.getAllExercises);
router.get('/', function(req,res, next){
  res.render('mainView', { title: 'ITTWeb_FitnessApp_group2' })
});

module.exports = router;