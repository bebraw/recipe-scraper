var cheerio = require('cheerio');

var URL_ROOT = 'http://recipes.wikia.com';


module.exports = function(data, cb) {
    var $ = cheerio.load(data);
    var links = [];
    $('.allpageslist tr').each(function(i, el) {
        links.push($(el).find('a').first().attr('href'));
    });

    cb(null, links.map(function(v) {
        return URL_ROOT + v;
    }));
};

