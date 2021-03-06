var exec = require('child_process').exec;
var plist = require('plist');
var path = require('path');

var currentPath;
var pathQuery = 'mdfind "kMDItemDisplayName==Safari&&kMDItemKind==Application"';

var getPath = function(callback) {
    if (currentPath) {
        return callback(null, currentPath);
    }

    exec(pathQuery, function (err, stdout) {
        currentPath = stdout.trim();
        callback(err, currentPath);
    });
};

var getVersion = function(callback) {
    getPath(function(err, p) {
        var pl = path.join(p, 'Contents', 'version.plist');
        plist.parseFile(pl, function(err, data) {
            callback(err, data[0].CFBundleShortVersionString);
        });
    });
};

exports.path = getPath;
exports.version = getVersion;
