
var github = require('../github_api.js');


exports.getLatestVersion = function(callback) {

  github.getLatestVersion('velesin/jasmine-jquery', function(latestVersion) {
    callback(latestVersion);
  });

};

