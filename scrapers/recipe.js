var cheerio = require('cheerio');


module.exports = function(data, cb) {
    var $ = cheerio.load(data);
    var name = $('meta[property="og:title"]').attr('content');
    var ingredients = [];
    $('#Ingredients').parent().next().find('a').each(function(i, el) {
        ingredients.push($(el).attr('title').toLowerCase());
    });

    cb(null, {
        name: name,
        ingredients: ingredients
    });
};

