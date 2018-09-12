const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://test:test@ittwebassignment1-9rxs5.mongodb.net/test?retryWrites=true";
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const assert = require('assert');

const create = function(req, res) {
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

const remove = function(req, res) {
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
    var _exerciseArray = [];
    var workoutArray = [];
    var workProgram = "WorkOutPrograms";

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        if(req.body.name !== undefined)
        {
            workProgram = req.body.name;
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

const getAllWorkOutPrograms = function(callback) {
    var _workOutArray = [];

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
    var collections = db.db("test").listCollections({});
    console.log(collections);
    collections.forEach(element => {
        _workOutArray.push(element);
    }).then(() => {
        callback(null, _workOutArray);
    });
    });
};

module.exports = {
    create, 
    remove,
    getAllExercises
};