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

var data = fs.readFileSync("../JoakimMain/Documents/GitHub/top-chef/docs/js/restaurantss.json", "utf8");
var obj = JSON.parse(data);
var taille = obj.restaurants.length;
var rat = 0;
/*
for (var i = 0; i < 20; i++) 
	{ 
    searchRestaurant(obj.restaurants[i].name); 
}
*/
for (var i = 1; i < taille; i++) {
    setTimeout(function(x) { return function() { searchRestaurant(obj.restaurants[x].name) ;  }; }(i), 50*i);
}



function searchRestaurant(restaurantName) 
{
    url = 'https://m.lafourchette.com/api/restaurant-prediction?name=' + restaurantName;
    request(url, function (error, response, body){
           if(!error && response.statusCode == 200)
		   {
            var Response = JSON.parse(body);
			if(Response.length !==0)
			{
     console.log(restaurantName, Response[0].id);
			}	
		   }
else
{
	console.log(response.statusCode);
}	
}
        )
}


    
    





