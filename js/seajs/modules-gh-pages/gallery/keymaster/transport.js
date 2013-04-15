/**
 * @package https://raw.github.com/madrobby/keymaster/master/package.json
 * @src https://raw.github.com/madrobby/keymaster/master/keymaster.js
 */

define('#{{id}}', [], function(require, exports, module) {
    var global = {}, key = function(key, scope, method) {
        global.key(key, scope, method);
    };
    (function() {
    /*{{code}}*/
    }).call(global);
});

