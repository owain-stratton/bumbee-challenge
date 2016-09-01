'use strict';
var dummyjson   = require('dummy-json'),
    fs          = require('fs'),
    http        = require('http');

// RSSI is usually expressed in decibels from 0 (zero) to -120db and the closer it is to zero, the stronger the signal is.
var deviceHash = {
  deviceHash: function() {
    var hash = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i < 16; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  }
};

var template = fs.readFileSync(__dirname + '/template.hbs', { encoding: 'utf8' });

var result = dummyjson.parse(template, {helpers: deviceHash});
var json = JSON.parse(result);

var options = {
  // host: 'http://localhost',
  port: 9090,
  path: '/api/track',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'Tracker1234'
  }
};

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  // console.log(res.headers);
  res.on('data', function(chunk) {
    // console.log(chunk);
  });

  res.on('end', function() {
    // console.log('No more data in response');
  });
});

req.on('error', function(e) {
  console.log('problem with request:' + e.message);
});

req.write(result);
req.end();
// module.exports = json;
