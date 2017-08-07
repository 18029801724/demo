var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var supervisor = require('supervisor');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// var index = require('./routes/index');
// var users = require('./routes/users');
   var routes = require('./routes/index');

var app = express();

//DB
var db = mongoose.connect('mongodb://localhost/blogTest');

    db.connection.on('error',function(error){
  console.log(error+'数据库连接失败');
 })
    db.connection.on('open',function(){
    console.log('数据库连接成功');
 })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "45454",
    store: new MongoStore({
		cookieSecret: 'jdghjf',
		db: 'blogTest',
		host: 'localhost'
	})
}));    

// app.use('/', index);
// app.use('/users', users);
  routes(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
