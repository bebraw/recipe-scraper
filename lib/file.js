var fs = require('fs');


exports.read = function(path, cb) {
    fs.readFile(path, {
        encoding: 'utf-8'
    }, cb);
};

