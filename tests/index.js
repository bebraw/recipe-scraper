main();


function main() {
    var modules = require('require-dir')();

    Object.keys(modules).forEach(function(k) {
        modules[k]();
    });
}

