#!/usr/bin/env node
// usage: ./get_recipe_links.js > out.json
var logic = require('./logic');


main();

function main() {
    logic.recipes(function(err, links) {
        if(err) {
            return console.error(err);
        }

        console.log(links);
    });
}
