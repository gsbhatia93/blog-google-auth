var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//new ones
var morgan   = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var url = 'mongodb://127.0.0.1/blog';
//var configDB = require('./config/database.js');
mongoose.connect(url); // connect to our database

// new code for connection to mongo
 var mongo=require('mongodb');
 var monk = require('monk');
 var db  = monk('localhost:27017/blog');

var app = express();

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
app.use(morgan('dev')); // log every request to the console

// Make our db accessible to our router
// every request the app makes has a db object
app.use(function(req,res,next){

    req.db = db;
    next();
});
//app.use('/', index);
//app.use('/users', users);

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




//new
require('./config/passport')(passport); // pass passport for configuration
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.listen(3000);
console.log('The magic happens on port ' + 3000);
module.exports = app;
