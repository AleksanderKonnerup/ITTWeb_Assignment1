$(document).ready(function(){
    var MongoClient = require('mongodb').MongoClient;

    var url = 'mongodb+srv://test:test@ittwebassignment1-9rxs5.mongodb.net/test?retryWrites=true';
    MongoClient.connect(url,{useNewUrlParser:true}, 
    function(err, db){
    try{
    if(db.isConnected){
        console.log("Connected succesfully to MongoDb server");
        var collection = db.db("test").collection("WorkOutPrograms");
    }
    } catch(err){
    return console.dir(err);
    }});  
});

const getPreviousWorkOutProgram = () => {
    collection.findOne({}, function (findErr, result) {
        if (findErr) throw findErr;
       return result;
      });
};

const createWorkOutProgram = () => {
    $createWorkOut
    showNewTable();
};

const showNewTable = () => {
    $newTable.visibilty = 'visible';
};