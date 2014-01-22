var assert = require('assert');
var path = require('path');
var read = require('../lib/file').read;
var scrape = require('../scrapers/allpages');


var URL_ROOT = 'http://recipes.wikia.com';

module.exports = function() {
    read(path.join(__dirname, './data/allpages.html'), function(err, d) {
        if(err) {
            return console.error(err);
        }

        scrape(d, function(err, d) {
            if(err) {
                return console.error(err);
            }

            assert.deepEqual(d, [
                URL_ROOT + '/wiki/Special:AllPages?from=%22Au_Jus%22_Beef_and_Noodles&to=Adas_bi_Haamud',
                URL_ROOT + '/wiki/Special:AllPages?from=Adas_bil_Hamod&to=Ajowan_seeds'
            ]);
        });
    });
};

