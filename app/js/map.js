(function() {
  'use strict';

  var L = require('leaflet');
  require('./leaflet.bouncemarker');
  var emitter = require('./mediator');
  var _ = {
    defaults: require('lodash.defaults')
  };
  var icon = L.icon({
    iconUrl: './img/marker.svg',
    iconSize: [10,10]
  });

  L.Icon.Default.imagePath = './img/';

  var map, layers, boundaries, layerGroup, stateGroup,
      options = {},
      southeast = [
        [16.155864, -62.779455],
        [39.795251, -95.562656]
      ];

  function init(opts) {
    if (!opts.data) throw 'You must provide the map with some data.';
    options = _.defaults(options, opts);
    createMap();
    registerHandlers();
    createLayers();
  }

  function registerHandlers() {
    emitter.on('advance:slide', advanceSlide);
  }

  function advanceSlide(anchor) {
    var href = anchor.getAttribute('href').slice(1);
    layerGroup.clearLayers();
    stateGroup.clearLayers();
    stateGroup.addLayer(boundaries[href]);
    setTimeout(function() {
      layerGroup.addLayer(layers[href]);
    }, 1200);
    map.flyToBounds(layers[href]);
  }

  function createStateBoundary(state) {
    return L.geoJson(options.states, {
      filter: function (feature, latlng) {
        switch (feature.properties.NAME) {
          case state: return true;
          default: return false;
        }
      }
    });
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
    layers = {
      allPoints: L.geoJson(options.data, {
        pointToLayer: pointToLayer
      }),
      AL: createStateLayer('Alabama'),
      AR: createStateLayer('Arkansas'),
      FL: createStateLayer('Florida'),
      GA: createStateLayer('Georgia'),
      NC: createStateLayer('North Carolina'),
      PR: createStateLayer('Puerto Rico'),
      LA: createStateLayer('Louisiana'),
      MS: createStateLayer('Mississippi'),
      TN: createStateLayer('Tennessee'),
      KY: createStateLayer('Kentucky'),
    };
    layerGroup.addLayer(layers.allPoints);
    map.fitBounds(layers.allPoints.getBounds());
  }

  function createMap()  {
    map = L.map('map', {
      scrollWheelZoom: false,
      dragging: false,
      zoomControl: false
    });

    layerGroup = L.layerGroup().addTo(map);
    stateGroup = L.layerGroup().addTo(map);

    L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png').addTo(map);
  }

  function addStates(states) {
    options.states = states;

    boundaries = {
      AL: createStateBoundary('AL'),
      AR: createStateBoundary('AR'),
      FL: createStateBoundary('FL'),
      GA: createStateBoundary('GA'),
      NC: createStateBoundary('NC'),
      PR: createStateBoundary('PR'),
      LA: createStateBoundary('LA'),
      MS: createStateBoundary('MS'),
      TN: createStateBoundary('TN'),
      KY: createStateBoundary('KY'),
    };
  }

  module.exports.init = init;
  module.exports.addStates = addStates;
})();
