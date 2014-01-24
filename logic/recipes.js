var async = require('async');
var fp = require('annofp');
var request = require('request');

var scrapers = require('../scrapers');


module.exports = function recipes(cb, limit) {
    limit = limit || 4;

    request('http://recipes.wikia.com/wiki/Special:AllPages', function(err, res, data) {
        if(err) {
            return cb(err);
        }

        scrapers.allpages(data, function(err, links) {
            if(err) {
                return cb(err);
            }

            async.mapLimit(links, limit, function(link, cb) {
                request(link, function(err, res, data) {
                    if(err) {
                        return cb(err);
                    }

                    scrapers.allpages(data, cb);
                });
            }, function(err, d) {
                if(err) {
                    return cb(err);
                }

                async.mapLimit(fp.flatten(d), limit, function(link, cb) {
                    request(link, function(err, res, data) {
                        if(err) {
                            return cb(err);
                        }

                        scrapers.recipes(data, cb);
                    });
                }, function(err, d) {
                    if(err) {
                        return cb(err);
                    }

                    cb(null, fp.flatten(d));
                });
            });
        });
    });
};
