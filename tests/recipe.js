var assert = require('assert');
var path = require('path');
var read = require('../lib/file').read;
var scrape = require('../scrapers/recipe');


module.exports = function() {
    read(path.join(__dirname, './data/recipe.html'), function(err, d) {
        if(err) {
            return console.error(err);
        }

        scrape(d, function(err, d) {
            if(err) {
                return console.error(err);
            }

            assert.deepEqual(d, {
                name: '\"Pasta\" Primavera',
                ingredients: [
                    'spaghetti squash',
                    'broccoli',
                    'zucchini',
                    'mushroom',
                    'carrot',
                    'garlic',
                    'margarine',
                    'skim milk',
                    'ricotta cheese',
                    'parmesan cheese',
                    'butter',
                    'salt',
                    'italian seasoning',
                    'pepper'
                ]
            });
        });
    });
};

