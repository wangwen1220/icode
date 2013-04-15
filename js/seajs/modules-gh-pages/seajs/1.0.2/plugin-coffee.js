
/**
 * @fileoverview The CoffeeScript plugin.
 */

define('plugin-coffee', ['plugin-base', 'coffee'], function(require) {

  var plugin = require('plugin-base');
  var CoffeeScript = require('coffee');


  plugin.add({
    name: 'coffee',

    ext: ['.coffee'],

    load: function(url, callback) {
      return CoffeeScript.load(url, callback);
    }
  });

});
