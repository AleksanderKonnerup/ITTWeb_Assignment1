
const submitExercise = () => {
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb+srv://test:test@ittwebassignment1-9rxs5.mongodb.net/test?retryWrites=true";

}

const getPreviousWorkOutProgram = () => {
    collection.findOne({}, function (findErr, result) {
        if (findErr) throw findErr;
       return result;
      });
}

const createWorkOutProgram = () => {
    $createWorkOut
    showNewTable();
}

const showNewTable = () => {
    $newTable.visibilty = 'visible';
}