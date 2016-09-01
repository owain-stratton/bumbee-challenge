'use strict';
var express           = require('express'),
    router            = express.Router(),
    dummyjson         = require('../data/tracking_nodes'),
    archive           = require('../data/archive'),
    postArchive       = require('../data/post_archive'),
    expressValidator  = require('express-validator'),
    fs                = require('fs');


var validateInput = function(req) {

  // req.checkBody('node[0].node_type', 'there must be a latitude').notEmpty();
  //
  //
  // var errors = req.validationErrors();
  // console.log(errors);
  // if(errors) {
  //   return false;
  // }

  return true;
  // req.body.node.forEach(function(index) {
  //
  //   if(!req.checkBody(index.node_type).notEmpty()) {
  //     return false;
  //   }
  //
  // });

  // return true;
};

function Authenticate(req, res, next) {
  var token = req.get('X-Auth-Token');
  if(!token || token !== 'Tracker1234') {
     res.status(403).send({
      status: 'forbidden'
    });
  } else if (!validateInput(req)) {
    res.status(400).send({
      status: 'validation_error'
    });
  } else {
    next();
  }
}

// Input data from remote tracking nodes at '/api/track'
router.post('/api/track', Authenticate, function(req, res, next) {
  var data = archive(req.body);
  postArchive(data);
});

// Processed data from '/api/track' to archive server at '/api/archive'
router.post('/api/archive', function(req, res, next) {
  res.status(200).send({
    status: 'ok'
  });

});

// Frontend viewer at '/viewer'
 // Serve Google maps view with last 100 unique visits
 // Visits grouped on markers
 // Truncate position to 4 decimal places (not rounding)
router.get('/viewer', function(req, res, next) {
  var localData = fs.readFileSync(__dirname + '/../data/local_data_storage.json', { encoding: 'utf8' });
  var localJson = JSON.parse(localData);

  var markerArr = [];
  for(var i = 0; i < 3; i++) {
    markerArr.push(localJson.node[i]);
  };

  res.send(markerArr);
});

module.exports = router;
