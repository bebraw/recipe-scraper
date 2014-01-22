#!/usr/bin/env node
var fs = require('fs');

var async = require('async');
var glob = require('glob');

var INPUT_DIR = 'output';
var INGREDIENTS = ['cucumber', 'cottage cheese', 'cream', 'walnuts', 'garlic',
    'dill', 'sunflower oil', 'salt', 'egg', 'rice flour', 'water', 'salt', 'baking soda',
    'ginger', 'peanut oil', 'peas', 'onion'];

main();

function main() {
    var limit = 2; // ok to miss 2 ingredients

    glob(INPUT_DIR + '/*.json', function(err, files) {
        if(err) {
            return console.error(err);
        }

        async.each(files, function(file, cb) {
            fs.readFile(file, {
                encoding: 'utf-8'
            }, function(err, d) {
                if(err) {
                    return console.error(err);
                }

                var recipe = JSON.parse(d);

                if(recipe.ingredients) {
                    var missing = difference(recipe.ingredients, INGREDIENTS);

                    if(missing.length <= limit) {
                        console.log('recipe ok', recipe.link, 'missing', missing);
                    }
                }

                cb();
            });
        });
    });
}

function difference(a, b) {
    var ret = a.slice();

    b.forEach(function(v) {
        var index = ret.indexOf(v);

        if(index >= 0) {
            ret.splice(index, 1);
        }
    });

    return ret;
}
