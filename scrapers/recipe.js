var cheerio = require('cheerio');


module.exports = function(data, cb) {
    var $ = cheerio.load(data);
    var name = $('meta[property="og:title"]').attr('content');
    var ingredients = [];
    $('#Ingredients').parent().next().find('a').each(function(i, el) {
        var title = $(el).attr('title');

        if(title) {
            ingredients.push(title.toLowerCase());
        }
    });

    cb(null, {
        name: name,
        ingredients: ingredients
    });
};

