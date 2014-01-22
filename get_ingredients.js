#!/usr/bin/env node
var fs = require('fs');

var async = require('async');
var glob = require('glob');

var INPUT_DIR = 'output';
var OUTPUT_FILE = 'output/ingredients.json';

main();

function main() {
    var allIngredients = {};

    glob(INPUT_DIR + '/*.json', function(err, files) {
        if(err) {
            return console.error(err);
        }

        async.each(files, function(file, cb) {
            fs.readFile(file, {
                encoding: 'utf-8'
            }, function(err, d) {
                if(err) {
                    return cb(err);
                }

                var json = JSON.parse(d);

                if(json.ingredients) {
                    json.ingredients.forEach(function(v) {
                        allIngredients[v] = true;
                    });
                }

                cb();
            });
        }, function(err) {
            if(err) {
                return console.error(err);
            }

            fs.writeFile(OUTPUT_FILE, JSON.stringify(Object.keys(allIngredients).sort()));
        });
    });
}
