'use strict';
var $ = require('jquery'),
    L = require('leaflet');


var createMarkers = function(data) {
  var markerArr = [];

  data.visits.forEach(function(visit, index) {
    markerArr.push(L.marker([visit.lat, visit.long])
      .bindPopup('RSSI: ' +  visit.rssi));
  });

  return markerArr;
};

var createLayerGroup = function(nodes) {

  nodes.forEach(function(node, index) {
    L.featureGroup(createMarkers(node))
      .addTo(map);
  });

};

var map = L.map('map', {
  center: [59.36, 18.0],
  zoom: 8
});

L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

L.Icon.Default.imagePath = '../styles/css/images';



$.get('/viewer')
  .done(function(response) {
    createLayerGroup(response);
  }).fail(function(err) {
    console.error(err.message);
  });
