/* var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var results = [];
var data = fs.readFileSync("../JoakimMain/Documents/GitHub/top-chef/docs/js/restaurantss.json", "utf8");
var restaurant = data.split("},");
var contents = [];

for(var i = 0 ; i <restaurant.length -1 ; i++)
{
  contents[i]=JSON.parse(restaurant[i].name);
  console.log(contents[i]);
}
*/
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs  = require('fs');


searchRestaurant('Aux Indes');

function searchRestaurant(restaurantName) {
    url = 'https://www.lafourchette.com/search-refine/' + restaurantName;
    request(url, function (error, response, html) {
        if(error){
            console.log(error);
        } else if ( response.statusCode != 200) {
            console.log(response.statusCode);
        } else {
            var $ = cheerio.load(html);
            var resultItem = $('.resultItem-name');
            resultItem = resultItem.first();
            /* console.log(resultItem.text()); */
            var url = resultItem.children().first();
			var temp = url.attr('href');
             console.log(url.attr('href')); 
			 var numbr = temp.split('/').pop();
			 console.log(numbr);
			 
			 var url = 'https://www.lafourchette.com/reservation/module/date-list/' + numbr ;

request(url, (error, response, body)=> {
  if (!error && response.statusCode === 200) 
  {
    var fourchResponse = JSON.parse(body);
     console.log("Got a response: ", fourchResponse.data.bestSaleTypeAvailable.title); 
  } else 
  {
    console.log("Got an error: ", error, ", status code: ", response.statusCode);
  }
  
})
        }
    })
}
