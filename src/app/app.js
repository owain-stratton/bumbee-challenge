'use strict';
var $ = require('jquery'),
    L = require('leaflet');

var map = L.map('map', {
  center: [59.36, 18.0],
  zoom: 10
});
var featureGroup;

var createMarkers = function(data) {
  var markerArr = [];

  data.visits.forEach(function(visit, index) {
    var latTruncate = Math.floor(visit.lat * 10000) / 10000;
    var longTruncate = Math.floor(visit.long * 10000) / 10000;
    markerArr.push(L.marker([latTruncate, longTruncate])
      .bindPopup('RSSI: ' +  visit.rssi));
  });

  return markerArr;
};

var createLayerGroup = function(nodes) {

  nodes.forEach(function(node, index) {
    featureGroup = L.featureGroup(createMarkers(node))
      .addTo(map);
  });

  map.fitBounds(featureGroup.getBounds());

};





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
