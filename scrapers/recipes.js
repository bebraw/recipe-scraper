var cheerio = require('cheerio');


module.exports = function(data, cb) {
    var $ = cheerio.load(data);
    var links = [];
    $('.mw-allpages-table-chunk a').each(function(i, el) {
        links.push($(el).attr('href'));
    });

    cb(null, links);
};

