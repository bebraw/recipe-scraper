var assert = require('assert');
var path = require('path');
var read = require('../lib/file').read;
var scrape = require('../scrapers/recipes');


module.exports = function() {
    read(path.join(__dirname, './data/recipes.html'), function(err, d) {
        if(err) {
            return console.error(err);
        }

        scrape(d, function(err, d) {
            if(err) {
                return console.error(err);
            }

            assert.deepEqual(d, [
                '/wiki/%22Au_Jus%22_Beef_and_Noodles',
                '/wiki/%22Better_For_You%22_Turkey_Burgers_with_Olives',
                '/wiki/%22Chinese%22_Chop_Suey'
            ]);
        });
    });
};

