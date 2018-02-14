const request = require('request')
     ,url = 'https://www.lafourchette.com/reservation/module/date-list/12117'

request(url, (error, response, body)=> {
  if (!error && response.statusCode === 200) {
    const fbResponse = JSON.parse(body)
    console.log("Got a response: ", fbResponse.data)
  } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode)
  }
})