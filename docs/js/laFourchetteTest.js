var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs  = require('fs');


searchRestaurant();

function searchRestaurant() {
		 
			 /* var url = 'https://www.lafourchette.com/reservation/module/date-list/' + '14234' ; */
             var url = 'https://m.lafourchette.com/api/restaurant-prediction?name=Elsa';
request(url, (error, response, body)=> {
  if (!error && response.statusCode === 200) 
  {
    var fourchResponse = JSON.parse(body);
	if(fourchResponse.length !== 0)
	{
		console.log("OK ");
     console.log("Got a response: ", fourchResponse[0].id); 
	}
  } 
  else 
  {
    console.log("Got an error: ", error, ", status code: ", response.statusCode);
  }
  
})
        }
