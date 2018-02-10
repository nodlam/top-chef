var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

function get_info(url, callback) {
    request(url, function (err, resp, html) {
        if (!err) {
            const $ = cheerio.load(html);
            var name = $('h1').first().text();
            var address = $('.thoroughfare').first().text();
            var zipcode = $('.postal-code').first().text();;
            var city = $('.locality').first().text();
            var chef = $('.field--name-field-chef').children('.field__items').text();
			var star = $('.michelin-poi-distinctions-list').text();
			
			if (star.startsWith("1")) {star="1";}
            else if (star.startsWith("2")) {star="2";}
             else if(star.startsWith("3")) {star="3";} 
			
            var restaurant = {
                "name": name,
                "address": address,
                "zipcode": zipcode,
                "city": city,
                "chef": chef,
				"star": star
            };
	
            callback(restaurant);
        }
    });
}

function get_urls_on_page(url, callback) {
    var page_urls = [];
    request(url, function (err, resp, html) {
        if (!err) {
            const $ = cheerio.load(html);
            $('a[class=poi-card-link]').each(function (i, elem) {
                page_urls.push('https://restaurant.michelin.fr' + $(elem).attr('href'));
            }
            );
            callback(page_urls);
        }
    });
}

function get_total_page_number(url, callback) {
    request(url, function (err, resp, html) {
        if (!err) {
            const $ = cheerio.load(html);
            var nbr = $('ul.pager').children('.last').prev().children().html();
            callback(nbr);
        }
    });
}

function scrape(url) {
    var json = { "restaurants": [] };
    get_total_page_number(url, function (nbr) {
        for (var i = 1; i < +nbr + 1; i++) {
            get_urls_on_page(url + '/page-' + i.toString(), function (arr) {
                arr.forEach(function (elem) {
                    get_info(elem, function (restaurant) {
                        json.restaurants.push(restaurant);
                        fs.writeFile('../JoakimMain/Documents/GitHub/top-chef/docs/js/restaurantss.json', JSON.stringify(json), 'utf8', function(err) {
                            if (!err) {
                                console.log('Restaurant ajouté.');
                            }
                            else {
                                return console.log(err);
                            }
                        });
                    });
                });
            });
        }
    });
}

scrape('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin');