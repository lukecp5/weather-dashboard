var APIKey = "fe02176d7651716d37adb2b5b5ee7209";
// var city = "Atlanta";
var dayAmt = 6;
var lat = 0;
var lon = 0;
var apiUrl = "api.openweathermap.org";
var mainUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  lat +
  "&lon=" +
  lon +
  "&exclude=hourly,minutely&units=imperial&appid=" +
  APIKey;
var cardHolder = document.querySelector("#dayCards")

// var url = `${apiUrl}/data/2.5/find?q=${location}&appid=${APIKey}`;
// console.log(url);

// var weatherData;
var searchButtonEl = document.querySelector("#search-button");
var searchInputEl = document.querySelector("#citySearch");
console.log(searchInputEl)
var cityNameEl = document.querySelector("#cityName");
// ~! Fetches coordinates for the searched city and stores them in the lat & lon variables
function getCoordinates(location) {
      var firstUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&appid=" + APIKey;
  fetch(firstUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(location);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat);
      console.log(lon);
      setCityName(data);
      getWeather(lat,lon);
    });
}

function setCityName(data){
      cityNameEl.textContent = data[0].name;
}

function getWeather(lat,lon) {
var mainUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=" + APIKey;
console.log(mainUrl);
  fetch(mainUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("This is the weather data from onecall: " + data);
      var weatherData = data;
      // for(i = 0; i <2; i++){
      cardHolder.innerHTML = '';
            for(day in data.daily){
                  var dateObject = new Date(data.daily[day].dt * 1000);
                  var date = dateObject.toString();
                  var temp = data.daily[day].temp.day;
                  var wind = data.daily[day].wind_speed;
                  var humidity = data.daily[day].humidity;
                  var newCard = document.createElement("div");
                  newCard.classList = 'card';
                  var content = `<div class="card">
                  <div class="card-body">
                    <h3 class="card-title">${date}</h3>
                    <dl>
                      <dt>Temp:</dt>
                      <dd>${temp}</dd>
                      <dt>Wind:</dt>
                      <dd>${wind}MPH</dd>
                      <dt>Humidity:</dt>
                      <dd>${humidity}</dd>
                    </dl>
                  </div>
                  </div>`
                  newCard.innerHTML = content;
                  cardHolder.appendChild(newCard);
            }
      // }
      for (day in data.daily) {
        var dateObject = new Date(data.daily[day].dt * 1000);
        console.log("Date: " + dateObject.toString()); //data.daily[day]
        console.log("UV Index: " + data.daily[day].uvi);
        console.log("Temperature: " + data.daily[day].temp.day);
      }
      handleSuccessfulLocationFetch(data);
    });
}
function handleSuccessfulLocationFetch(data) {
}
// getCoordinates();
// getWeather();
var historyEl = document.getElementById("history");
console.log(historyEl);

function displaySavedLocations() {
  var locations = ["Chicago", "Atlanta", "Washington D.C."];
  //   var locations = localStorage.getItem("locations");
  //   if(locations){
  //   var parsedLocations = JSON.parse(locations);
  locations.forEach(function (item) {
    var listItem = document.createElement("li");
    var content = `<button class='historyButton btn' data-location='${item}'>${item}</button>`;
    listItem.innerHTML = content;
    historyEl.append(listItem);
    // Could use JQuery - Could use createElement
    // <li><button class="historyButton btn" data-location="Austin">Austin</button></li>
  });
}
// }
function updateContentPane(evt) {
  buttonClicked = evt.target;
  var location = buttonClicked.getAttribute("data-location");
  alert(location);
  getCoordinates(location);
}

function getLocation(event) {
 event.preventDefault();
  var location = searchInputEl.value;
  getCoordinates(location);
//   getWeather();
}

function addEventListeners() {
  historyEl.addEventListener("click", updateContentPane);
  searchButtonEl.addEventListener("click", getLocation);
}

function init() {
  displaySavedLocations();
  addEventListeners();
//   getCoordinates();
//   getWeather();
}
// displaySavedLocations();
init();
// var listItem = document.createElement("li");
// var content = `<button class="historyButton btn" data-location="${item}">${item}</button>`;
// listItem.innerHtml = content;
// historyEl.appendChild(listItem);
