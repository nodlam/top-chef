var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("https://restaurant.michelin.fr/restaurants/paris/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('div#ds-1col node node--poi view-mode-poi_card node--poi-card node--poi--poi-card clearfix gtm-jsevent-processed').each(function( index ) {
    var user = $(this).find('div.attr-gtm-title').text().trim();
    console.log("User: " + user);
    fs.appendFileSync('reddit.txt', user + '\n');
  });

});