/**
 * @package https://raw.github.com/documentcloud/backbone/master/package.json
 *
 * @src http://documentcloud.github.com/backbone/backbone.js
 * @min http://documentcloud.github.com/backbone/backbone-min.js
 */

define('#{{id}}', ['underscore{{debug}}', '${{debug}}'], function(require, exports) {

  var previousUnderscore = this._;
  var previousJQuery = this.jQuery;
  this._ = require('underscore{{debug}}');
  this.jQuery = require('${{debug}}');

/*{{code}}*/

  this._ = previousUnderscore;
  this.jQuery = previousJQuery;
});
