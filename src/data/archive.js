'use strict';
var http     = require('http'),
    fs       = require('fs');

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

// var removeDuplicateVisits = function(nodes) {
//
//   nodes.visits.forEach(function(visit, index) {
//
//
//
//   });
//
// };

var archiveNodeData = function(nodeData) {

  var archiveData = new archiveDataConstructor(nodeData);
  return archiveData;

};

// Check node_type
var processData = function(trackingNodes, callback) {

  var archiveArray = [];

  trackingNodes.node.forEach(function(value, index) {

    // var cleanedData = removeDuplicateVisits(value);
    if(value.node_type === 1 || value.node_type === 2) {
      archiveArray.push(archiveNodeData(value));
    }

  });

  fs.writeFileSync(__dirname + '/local_data_storage.json', JSON.stringify(trackingNodes));

  // Return the array for archiving
  return archiveArray;
};

module.exports = processData;
