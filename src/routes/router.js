'use strict';
var express     = require('express'),
    router      = express.Router(),
    dummyjson   = require('../data/tracking_nodes.js');

function Authenticate(req, res, next) {
  var token = req.body['X-Auth-Token'];
  if(!token || token !== 'Tracker1234') {
     res.status(403).send({
      status: 'forbidden'
    });
  } else {
    res.status(200).send({
      status: 'ok',
      data: dummyjson
    });
    next();
  }
}

// Input data from remote tracking nodes at '/api/track'
  // if dupliate visit only send visit with strongest signal (rssi)
  // Only archive data from tracker and internet_provider
  // Locally store data from mobile_station and drone for map rendering


router.post('/api/track', Authenticate, function(req, res, next) {
  // console.log(req);
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
  res.json(dummyjson);
});

module.exports = router;
