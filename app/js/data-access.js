(function () {
  'use strict';

  var xhr = require('xhr');
  var emitter = require('./mediator');

  var accomplishments;

  function init() {
    xhr.get('./data/accomplishments.js', function (err, res) {
      accomplishments = JSON.parse(res.body);
      emitter.emit('accomplishments:loaded', accomplishments);
    });
  }

  function getAll() {
    return accomplishments;
  }

  module.exports.init = init;
  module.exports.getAll = getAll;
})();
