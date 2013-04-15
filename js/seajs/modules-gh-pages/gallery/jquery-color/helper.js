
var github = require('../github_api.js');


exports.getLatestVersion = function(callback) {

  github.getLatestVersion('jquery/jquery-color', function(latestVersion) {
    callback(latestVersion);
  });

};
