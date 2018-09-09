var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/mainView');
var usersRouter = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

var url = 'mongodb://localhost:27017/ITTWeb_Assignment1_DB';
MongoClient.connect(url,{useNewUrlParser:true}, 
  function(err, db){
  try{
  if(db.isConnected){
    console.log("Connected succesfully to MongoDb server");
    var collection = db.db("ITTWeb_Assignment1_DB").collection("WorkOutPrograms");
    collection.findOne({}, function (findErr, result) {
      if (findErr) throw findErr;
      console.log(result.Exercise.name);
    });
  }
  db.close();
} catch(err){
return console.dir(err);
}});

module.exports = app;