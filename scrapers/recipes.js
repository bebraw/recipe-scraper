var cheerio = require('cheerio');

var URL_ROOT = 'http://recipes.wikia.com';


module.exports = function(data, cb) {
    var $ = cheerio.load(data);
    var links = [];
    $('.mw-allpages-table-chunk a').each(function(i, el) {
        links.push($(el).attr('href'));
    });

    cb(null, links.map(function(v) {
        return URL_ROOT + v;
    }));
};

