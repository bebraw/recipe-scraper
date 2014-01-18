var cheerio = require('cheerio');


module.exports = function(data, cb) {
    var $ = cheerio.load(data);
    var name = $('meta[property="og:title"]').attr('content');

    cb(null, {
        name: name
    });
};

