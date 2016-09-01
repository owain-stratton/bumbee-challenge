'use strict';
var http     = require('http');

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
      // console.log(chunk);
    });

    res.on('end', function() {
      // console.log('No more data in response');
    });
  });

  req.on('error', function(e) {
    console.log('problem with request:' + e.message);
  });

  req.write(data);
  req.end();
};



var archiveDataConstructor = function(nodeData) {
  // console.log(nodeData);
  if(nodeData.node_type === 1) {
    this.node_type = 'tracker';
  } else {
    this.node_type = 'internet_provider';
  }

  this.device = nodeData.visits[0].device;

  var visitTimes = [];
  var rssiArr = [];
  var lat = 0;
  var long = 0;

  nodeData.visits.forEach(function(value, index) {
    visitTimes.push(value.time);
    rssiArr.push(value.rssi);
    lat += value.lat;
    long += value.long;
  });

  this.time_start = Math.min.apply(Math, visitTimes);
  this.time_end = Math.max.apply(Math, visitTimes);

  this.rssi_min = Math.min.apply(Math, rssiArr);
  this.rssi_max = Math.max.apply(Math, rssiArr);

  this.samples_count = nodeData.visits.length;

  this.average_position = {
    latitude: lat / nodeData.visits.length,
    longitude: long / nodeData.visits.length
  };

};

var archiveNodeData = function(nodeData) {
  var archiveData = new archiveDataConstructor(nodeData);
  return archiveData;
  // postArchiveData(archiveData);
};

// Check node_type
var processData = function(trackingNodes) {
  var archiveArray = [];
  trackingNodes.node.forEach(function(value, index) {
    if(value.node_type === 1 || value.node_type === 2) {
      // console.log(value);
      archiveArray.push(archiveNodeData(value));
    } else if(value.node_type === 3 || value.node_type === 4) {
      // console.log(value);
    }
  });
  console.log(archiveArray);
};

module.exports = processData;
