var express = require('express');
var router = express.Router();

const Exercise_controller = require('../controllers/exercise.controller');

router.post('/create', Exercise_controller.create);
router.post('/remove', Exercise_controller.remove);
router.get('/', Exercise_controller.getAllExercises);

module.exports = router;