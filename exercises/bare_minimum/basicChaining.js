/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);


// getGitHubProfileAsync: getGitHubProfileAsync,
// generateRandomTokenAsync: generateRandomTokenAsync,
// readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync


var helpers = require('./promisification');
var utils = require('./promiseConstructor');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return utils.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      return helpers.getGitHubProfileAsync(username);
    })
    .then(function(body) {
      return JSON.stringify(body, null, 2);
    })
    .then(function(stringBody) {
      return fs.writeFile(writeFilePath, stringBody);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

