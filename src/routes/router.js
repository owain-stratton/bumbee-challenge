'use strict';
var express           = require('express'),
    router            = express.Router(),
    dummyjson         = require('../data/tracking_nodes'),
    expressValidator  = require('express-validator');

var validateInput = function(req) {

  req.checkBody('node[0].node_type', 'there must be a latitude').notEmpty();


  var errors = req.validationErrors();
  console.log(errors);
  if(errors) {
    return false;
  }

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
    res.status(200).send({
      status: 'ok'
    });
    next();
  }
}

// Input data from remote tracking nodes at '/api/track'
  // if dupliate visit only send visit with strongest signal (rssi)
  // Only archive data from tracker and internet_provider
  // Locally store data from mobile_station and drone for map rendering


router.post('/api/track', Authenticate, function(req, res, next) {
  console.log(req.body);
});

// Processed data from '/api/track' to archive server at '/api/archive'
 // Only accepts 'POST'
 // Mandatory 'X-Auth-Token: Tracker1234' header
 // Response 'status: ok'
 // Response JSON
 // Response 200 code on success
 // Response 403 code on forbidden (invalid token)
 // Response 400 code on malformed input data (all fields required)
router.post('/api/archive', function(req, res, next) {

});

// Frontend viewer at '/viewer'
 // Serve Google maps view with last 100 unique visits
 // Visits grouped on markers
 // Truncate position to 4 decimal places (not rounding)
router.get('/viewer', function(req, res, next) {
  // res.json(dummyjson);
});

module.exports = router;
