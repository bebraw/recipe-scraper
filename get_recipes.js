#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var async = require('async');
var changeCase = require('change-case');
var mkdirp = require('mkdirp');
var request = require('request');

var scrapers = require('./scrapers');

var OUTPUT_DIR = 'output';


main();

function main() {
    mkdirp(OUTPUT_DIR, function() {
        getAllPages();
    });
}

function getAllPages() {
    var limit = 4;

    request('http://recipes.wikia.com/wiki/Special:AllPages', function(err, res, data) {
        if(err) {
            return console.error(err);
        }

        scrapers.allpages(data, function(err, links) {
            if(err) {
                return console.error(err);
            }

            async.eachLimit(links, limit, function(link, cb) {
                request(link, function(err, res, data) {
                    if(err) {
                        return cb(err);
                    }

                    scrapers.allpages(data, function(err, links) {
                        if(err) {
                            return cb(err);
                        }

                        scrapeRecipeLinks(links, cb);
                    });
                });
            }, function(err) {
                if(err) {
                    return console.error(err);
                }
            });
        });
    });
}

function scrapeRecipeLinks(links, cb) {
    eachLink(links, function(link, data, cb) {
        scrapers.recipes(data, function(err, recipeLinks) {
            if(err) {
                return cb(err);
            }

            scrapeRecipes(recipeLinks, cb);
        });
    }, cb);
}

function scrapeRecipes(links, cb) {
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
    }, cb);
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
