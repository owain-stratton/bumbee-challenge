'use strict';
var http = require('http');

var postArchiveData = function(data) {

  var options = {
    // host: 'http://localhost',
    port: 9090,
    path: '/api/archive',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    // console.log(res.headers);
    res.on('data', function(chunk) {
      console.log(chunk);
    });

    res.on('end', function() {
      console.log('No more data in archive post response');
    });
  });

  req.on('error', function(e) {
    console.log('problem with request:' + e.message);
  });
  
  var stringData = JSON.stringify(data);
  req.write(stringData);
  req.end();

};

module.exports = postArchiveData;
