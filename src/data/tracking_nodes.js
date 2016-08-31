var dummyjson   = require('dummy-json'),
    fs          = require('fs');

// RSSI is usually expressed in decibels from 0 (zero) to -120db and the closer it is to zero, the stronger the signal is.
var deviceHash = {
  "device": function() {
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
