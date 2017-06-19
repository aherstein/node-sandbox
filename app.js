var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/node-sandbox');
var expressVue = require('express-vue');
var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware')


var index = require('./routes/index');
var users = require('./routes/users');
var userApi = require('./routes/user-api');

var app = express();

app.set('views', path.join(__dirname, 'views'));

// view engine setup for pug
// app.set('view engine', 'pug');

// view engine setup for vue
// Optional if you want to specify the components directory separate to your views, and/or specify a custom layout.
app.set('vue', {
    //ComponentsDir is optional if you are storing your components in a different directory than your views
    // componentsDir: __dirname + '/components',
    //Default layout is optional it's a file and relative to the views path, it does not require a .vue extension.
    //If you want a custom layout set this to the location of your layout.vue file.
    defaultLayout: 'layout'
});
app.engine('vue', expressVue);
app.set('view engine', 'vue');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/views/sass', // where the sass files are
    dest: __dirname + '/public/stylesheets', // where css should go
    debug: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// User interface
app.use('/', index);
app.use('/user', users);


// Public API
app.use('/api/user', userApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
