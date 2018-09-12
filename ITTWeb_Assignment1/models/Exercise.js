const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = Schema({
    name: {type: String, required: true, max: 50},
    description: {type: String, required: false, max: 200},
    set: {type: Number, required: true, max: 100},
    repsOrTime: {type: Number, required: true, max: 500}
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports = Exercise;