'use strict';
var express           = require('express'),
    router            = express.Router(),
    dummyjson         = require('../data/tracking_nodes'),
    archive           = require('../data/archive'),
    postArchive       = require('../data/post_archive'),
    fs                = require('fs'),
    util              = require('util');


var validateInput = function(req) {

  var error = {}

  req.body.node.forEach(function(value, index) {
    if(value.node_type === null || value.node_type === '') {
      error[index] = 'Node type is required';
    }

    value.visits.forEach(function(value, index) {

      if(value.lat === null || value.lat === '') {
        error[index] = 'Latitude is required';
      } else if(value.long === null || value.long === '') {
        error[index] = 'Longitude is required';
      } else if(value.device === null || value.device === '') {
        error[index] = 'Device is required';
      } else if(value.time === null || value.time === '') {
        error[index] = 'Timestamp is required';
      } else if(value.rssi === null || typeof value.rssi !== 'number') {
        error[index] = 'RSSI is required';
      }

    });

  });

  if(Object.keys(error).length === 0) {
    return true;
  } else {
    console.log(error);
    return false
  }

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
router.get('/viewer', function(req, res, next) {
  var localData = fs.readFileSync(__dirname + '/../data/local_data_storage.json', { encoding: 'utf8' });
  var localJson = JSON.parse(localData);

  var markerArr = [];
  for(var i = 0; i < 100; i++) {
    markerArr.push(localJson.node[i]);
  };

  res.send(markerArr);
});

module.exports = router;
