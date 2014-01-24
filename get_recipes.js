#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var async = require('async');
var changeCase = require('change-case');
var mkdirp = require('mkdirp');
var request = require('request');

var logic = require('./logic');
var scrapers = require('./scrapers');

var OUTPUT_DIR = 'output';


main();

function main() {
    mkdirp(OUTPUT_DIR, function() {
        logic.recipes(scrapeRecipes);
    });
}

function scrapeRecipes(err, links) {
    if(err) {
        return console.error(err);
    }

    eachLink(links, function(link, data, cb) {
        scrapers.recipe(data, function(err, recipe) {
            if(err) {
                return cb(err);
            }

            if(recipe.ingredients.length) {
                var out = path.join(OUTPUT_DIR, changeCase.snakeCase(recipe.name)) + '.json';

                recipe.link = link;

                fs.writeFile(out, JSON.stringify(recipe), cb);
            }
            else {
                cb();
            }
        });
    }, function(err) {
        if(err) {
            return console.error(err);
        }

        console.log('done');
    });
}

function eachLink(links, iter, cb) {
    async.mapSeries(links, function(link, cb) {
        if(!link) {
            return cb();
        }

        request(link, function(err, res, data) {
            if(err) {
                return cb(err);
            }

            iter(link, data, cb);

            scrapers.recipes(data, function(err, recipeLinks) {
                if(err) {
                    return cb(err);
                }

                scrapeRecipes(recipeLinks, cb);
            });
        });
    }, cb);
}
