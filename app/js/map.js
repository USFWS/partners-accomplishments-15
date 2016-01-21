(function() {
  'use strict';

  var L = require('leaflet');
  require('./leaflet.bouncemarker');
  var emitter = require('./mediator');
  var icon = L.icon({
    iconUrl: './img/marker.svg',
    iconSize: [10,10]
  });

  L.Icon.Default.imagePath = './img/';

  var map, options, allPoints, AL, AR, FL, GA, NC, PR, LA, MS, TN, KY,
      southeast = [
        [16.155864, -62.779455],
        [39.795251, -95.562656]
      ];

  function init(opts) {
    if (!opts.data) throw 'You must provide the map with some data.';
    options = opts;
    createMap();
    setTimeout(createLayers, 500);
    registerHandlers();
  }

  function registerHandlers() {
  }

  function createStateLayer(state) {
    return L.geoJson(options.data, {
      filter: function (feature, latlng) {
        switch (feature.properties.state) {
          case state: return true;
          default: return false;
        }
      },
      pointToLayer: pointToLayer
    });
  }

  function pointToLayer(feat, latlng) {
    return L.marker(latlng, {
      icon: icon,
      bounceOnAdd: true
    });
  }

  function createLayers() {
    allPoints = L.geoJson(options.data, {
      pointToLayer: pointToLayer
    }).addTo(map);
    AL = createStateLayer('Alabama');
    AR = createStateLayer('Arkansas');
    FL = createStateLayer('Florida');
    GA = createStateLayer('Georgia');
    NC = createStateLayer('North Carolina');
    PR = createStateLayer('Puerto Rico');
    LA = createStateLayer('Louisiana');
    MS = createStateLayer('Mississippi');
    TN = createStateLayer('Tennessee');
    KY = createStateLayer('Kentucky');

    map.fitBounds(allPoints.getBounds());
  }

  function createMap()  {
    map = L.map('map', {
      scrollWheelZoom: false,
      dragging: false,
      zoomControl: false
    });

    L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  module.exports.init = init;
})();
