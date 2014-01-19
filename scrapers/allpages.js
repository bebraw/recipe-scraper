var cheerio = require('cheerio');


module.exports = function(data, cb) {
    var $ = cheerio.load(data);
    var links = [];
    $('.allpageslist tr').each(function(i, el) {
        links.push($(el).find('a').first().attr('href'));
    });

    cb(null, links);
};

