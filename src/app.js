// Develop a REST API Server to gather and process visitor data. Provide GoogleMaps viewer frontend for previewing last 100 unique visits
'use strict';
var express           = require('express'),
    routes            = require('./routes/router.js'),
    morgan            = require('morgan'),
    parser            = require('body-parser').json,
    expressValidator  = require('express-validator');

var app = express();

app.use(morgan('dev'));
app.use(parser());
app.use(expressValidator());

app.use('/', routes);




app.use(function(req, res, next) {
  var err = new Error('The page you were looking for could not be found please try another');
  err.status = 404;
  next(err);
});

// Error event handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


var port = process.env.PORT || 9090;

app.listen(port, function() {
  console.log('The server is running on port 9090. Code on!!!');
});
