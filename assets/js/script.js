var APIKey = "fe02176d7651716d37adb2b5b5ee7209";
var city = "Atlanta";
var dayAmt = 6;
var lat = 0;
var lon = 0;
var mainUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=" + APIKey;
var firstUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
// ~! Fetches coordinates for the searched city and stores them in the lat & lon variables
function getCoordinates(){
      fetch(firstUrl)
      .then(function(response){
            return response.json();
      })
      .then(function(data){
            console.log(data)
      })
}

function getWeather(){
      fetch(mainUrl)
      .then(function(response){
            return response.json();
      })
      .then(function(data){
            for(day in data.daily){
                  console.log("Date: " + moment("1627128000").format("MM/DD/YY")) //data.daily[day]
                 console.log("UV Index: " + data.daily[day].uvi)
                  console.log("Temperature: " + data.daily[day].temp.day)
            }    
      })
} 
      getCoordinates();
      getWeather();