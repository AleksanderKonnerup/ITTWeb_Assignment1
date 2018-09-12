const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://test:test@ittwebassignment1-9rxs5.mongodb.net/test?retryWrites=true";
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const assert = require('assert');

//#region Exercises
const createExercise = function(req, res) {
    var exercise = {name: req.body.name,
    description: req.body.description,
    set: req.body.set,
    repsOrTime: req.body.repsOrTime};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        db.db('test').collection("WorkOutPrograms").insertOne(exercise, function(err, result){
            assert.equal(null,err);
            console.log("Exercise added");
            res.redirect("/");
        });
    })
};

const removeExercise = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        var name = req.body.name;
        db.db("test").collection("WorkOutPrograms").findOneAndDelete({"name" : name },function(err, result){
            assert.equal(null, err);
            console.log("Exercise deleted");
            res.redirect("/");
        });
    })
};

const getAllExercises = function(req, res) {
    let _exerciseArray = [];
    let workoutArray = [];
    var workProgram = "WorkOutPrograms";

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        if(req.body.name !== undefined)
        {
            workProgram = req.body.name.toString();
        }

    db.db("test").collection(workProgram).find({}, (err, data) => {
        assert.equal(null, err);
        data.forEach(element => {
            _exerciseArray.push(element);
        }).then(() => {
            getAllWorkOutPrograms(function(err, result){
                assert.equal(null, err);
                result.forEach(x => {
                    workoutArray.push(x);
                });
                res.render("mainView", {exercises_Array : _exerciseArray, workOutPrograms_Array : workoutArray});
            });
        });
    })
})};
//#endregion

//#region Workouts
const getAllWorkOutPrograms = function(callback) {
    let _workOutArray = [];

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        var collections = db.db("test").listCollections({});
        collections.forEach(element => {
            _workOutArray.push(element);
        }).then(() => {
            callback(null, _workOutArray);
        });
    });
};

const selectWorkOut = function(req, res) {
    let _exerciseArray = [];
    let workoutArray = [];
    let workOutName;

    if(req.body.selectWorkOutName === undefined){
        workOutName = "WorkOutPrograms";
    } else{
        workOutName = req.body.selectWorkOutName.toString();
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        db.db("test").collection(workOutName).find({}, (err, data) => {
        assert.equal(null, err);
        data.forEach(element => {
            _exerciseArray.push(element);
        }).then(() => {
            getAllWorkOutPrograms(function(err, result){
                assert.equal(null, err);
                result.forEach(x => {
                    workoutArray.push(x);
                });
                res.render("mainView", {exercises_Array : _exerciseArray, workOutPrograms_Array : workoutArray});
            });
            });
        });
    })
};

const removeWorkout = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        let workOutName;
        if(req.body.removeWorkOutName === undefined){
            console.log(err);
            res.redirect("/");
        } else {
            workOutName = req.body.removeWorkOutName.toString();
        
            db.db("test").collection(workOutName).drop().then(function(err, result){
                console.log("WorkOut deleted");
                res.redirect("/");
        });
    }})
};

const createWorkoutProgram = function(req, res){
    let _exerciseArray = [];
    let workoutArray = [];
    let workOutName;

    if(req.body.createWorkoutName === undefined){
        console.log(err);
        res.redirect("/");
    } else{
        workOutName = req.body.createWorkoutName.toString();
        MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
            assert.equal(null, err);
            var collection = db.db("test").createCollection(workOutName).then(
                function(err, result){
                console.log("New Workout created");
                res.redirect("/")}).catch(res.redirect("/"));
        });
    } //Collectionen oprettes først når der tilføjes et document til collection, men kan ikke få insert til at virke...
};

//#endregion

module.exports = {
    createExercise, 
    removeExercise,
    getAllExercises,
    selectWorkOut,
    removeWorkout,
    createWorkoutProgram
};