(function () {
  'use strict';

  var xhr = require('xhr');
  var emitter = require('./mediator');

  var accomplishments, states;

  function init() {
    xhr.get('./data/accomplishments.js', function (err, res) {
      if (err) console.error(err);
      accomplishments = JSON.parse(res.body);
      emitter.emit('accomplishments:loaded', accomplishments);
    });

    xhr.get('./data/southeast.js', function (err, res) {
      if (err) console.error(err);
      states = JSON.parse(res.body);
      emitter.emit('states:loaded', states);
    });
  }

  function getAll() {
    return accomplishments;
  }

  function getStates() {
    return states;
  }

  module.exports.init = init;
  module.exports.getAll = getAll;
  module.exports.getStates = getStates;
})();
