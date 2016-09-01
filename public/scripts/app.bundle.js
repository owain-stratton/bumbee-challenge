(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"jquery":"jquery","leaflet":"leaflet"}]},{},[1]);
