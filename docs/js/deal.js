var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs  = require('fs');

var obj = require('./restaurantss.json');
var taille = obj.restaurants.length;

console.log('');
for (var i = 1; i < taille; i++) {
    setTimeout(function(x) { return function() { searchRestaurant(obj.restaurants[x].name,obj.restaurants[x].address,obj.restaurants[x].star) ; }; }(i), 270*i);
}



function searchRestaurant(restaurantName,adress,star) 
{
    var url = 'https://m.lafourchette.com/api/restaurant-prediction?name=' + restaurantName;
	
    request(url, function (error, response, body)
	{
           if(!error && response.statusCode == 200)
		   {
            var Response = JSON.parse(body);
			if(Response.length !==0)
			{
     console.log(restaurantName +', '+ adress + ', '+'\x1b[33m%s\x1b[0m' , star + ' Etoile');
	 var urlx = 'https://m.lafourchette.com/api/restaurant/'+ Response[0].id + '/sale-type'; 
	 request(urlx, (error, response, body)=> {
  if (!error && response.statusCode === 200) 
  {
    var fourchResponse = JSON.parse(body);
	if(fourchResponse.length !== 0)
	{	
if(fourchResponse[0].is_special_offer == true)
{
	console.log('\x1b[36m%s\x1b[0m', 'PROMOTION/EVENT EN COURS !');
     console.log(fourchResponse[0].title + " , "+ fourchResponse[0].exclusions); 
	 console.log('-----------------------------------------------------');
	 console.log('');
}
else 
{
	console.log('\x1b[31m%s\x1b[0m', 'Pas de réductions pour le moment'); 
	 console.log('-----------------------------------------------------');
	 console.log('');
}
	}
  } 
  else 
  {
     /* console.log("Got an error: ", error, ", status code: ", response.statusCode); */
  }
  
})
			}	
		   }
else
{
	/* console.log(response.statusCode); */
}	

}


        )
}


    
    





