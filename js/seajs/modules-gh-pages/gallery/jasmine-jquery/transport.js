/**
 * @name jasmine-jquery
 *
 * @src https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js
 */

define('#{{id}}', ['${{debug}}'], function(require) {

  var jQuery = require('${{debug}}');
  var $ = jQuery;

  /*{{code}}*/

  window.readFixtures = readFixtures;
  window.preloadFixtures = preloadFixtures;
  window.loadFixtures = loadFixtures;
  window.appendLoadFixtures = appendLoadFixtures;
  window.setFixtures = setFixtures;
  window.appendSetFixtures = appendSetFixtures;
  window.sandbox = sandbox;
  window.spyOnEvent = spyOnEvent;
  window.preloadStyleFixtures = preloadStyleFixtures;
  window.loadStyleFixtures = loadStyleFixtures;
  window.appendLoadStyleFixtures = appendLoadStyleFixtures;
  window.setStyleFixtures = setStyleFixtures;
  window.appendSetStyleFixtures = appendSetStyleFixtures;
  window.loadJSONFixtures = loadJSONFixtures;
  window.getJSONFixture = getJSONFixture;

});
