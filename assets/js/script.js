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
var cardHolder = document.querySelector("#dayCards");
// var locations = JSON.parse(localStorage.getItem("locations"));
// console.log(locations);
// var url = `${apiUrl}/data/2.5/find?q=${location}&appid=${APIKey}`;
// console.log(url);

// var weatherData;
var searchButtonEl = document.querySelector("#search-button");
var searchInputEl = document.querySelector("#citySearch");
console.log(searchInputEl);
var cityNameEl = document.querySelector("#cityName");
// ~! Fetches coordinates for the searched city and stores them in the lat & lon variables
function getCoordinates(location) {
  var firstUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&appid=" +
    APIKey;
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
      getWeather(lat, lon);
      // handleSuccessfulLocationFetch(data);
    });
}

function setCityName(data) {
  // cityNameEl.textContent = data[0].name;
  handleSuccessfulLocationFetch(data);
  // cityList.push(data[0].name);
  // localStorage.setItem("locations", JSON.stringify(cityList));
  // displaySavedLocations();
}

function getWeather(lat, lon) {
  var mainUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely&units=imperial&appid=" +
    APIKey;
  console.log(mainUrl);
  fetch(mainUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("This is the weather data from onecall: " + data);
      var weatherData = data;
      // for(i = 0; i <2; i++){
      cardHolder.innerHTML = "";
      // for(day in data.daily){

      // Assigns the current weather div's spans to variables to be updated.
      // var tempEl = document.querySelector("#currentTemp");
      // var windEl = document.querySelector("#currentWind");
      // var humidityEl = document.querySelector("#currentHumidity");
      // var uvEl = document.querySelector("#currentUVI");
      // var iconEl = document.querySelector("#weatherI");

      // ! Fills in the data for the current day's weather
      var dateObject = new Date(data.daily[0].dt * 1000);
      var month = dateObject.getMonth() + 1;
      var day = dateObject.getDate();
      var year = dateObject.getFullYear();
      console.log("Current Day" + (month + 1) + "/" + day + "/" + year);
      var temp = data.daily[0].temp.day;
      var wind = data.daily[0].wind_speed;
      var humidity = data.daily[0].humidity;
      var uvi = data.current.uvi;
      var iconURL = data.current.weather[0].icon;
      console.log(data);
      console.log(
        "Current day's weather: " + temp + "/" + wind + "/" + humidity
      );
      var weatherEl = document.getElementById("todaysWeatherCard");
      var currentContent = `<div class="card-body bg-secondary" id="currentWeatherCard">
      <h2 class="font-weight-bold card-title"><span id="cityName"></span> <span id="currentDate">${month}/${day}/${year}</span>
      <span id="weatherIcon"><img src="https://openweathermap.org/img/wn/${iconURL}.png" id="weatherI"></span></h2>
      <p class="card-text currentWeather">Temp: <span id="currentTemp">${temp}</span></p>
      <p class="card-text currentWeather">Wind Speed: <span id="currentWind">${wind}</span></p>
      <p class="card-text currentWeather">Humidity: <span id="currentHumidity">${humidity}</span></p>
      <p class="card-text currentWeather">UVI: <span id="currentUVI">${uvi}</span></p>
      </div>`
      weatherEl.innerHTML = currentContent;

      // ! Produces cards for the next 5 day's weather
      for (d = 1; d < 6; d++) {
        var dateObject = new Date(data.daily[d].dt * 1000);
        var month = dateObject.getMonth();
        var day = dateObject.getDate();
        var year = dateObject.getFullYear();
        var date = month + 1 + "/" + day + "/" + year;
        console.log(month + 1 + "/" + day + "/" + year);
        var temp = data.daily[d].temp.day;
        var wind = data.daily[d].wind_speed;
        var humidity = data.daily[d].humidity;
        // var d = data.daily;
        var newCard = document.createElement("div");
        newCard.classList = "card";
        var content = `<div class="card bg-primary text-center">
                  <div class="card-body">
                    <h4 class="card-title">${date}<image src="https://openweathermap.org/img/wn/${data.daily[d].weather[0].icon}.png"></h4>
                    <dl>
                      <dt>Temp:</dt>
                      <dd>${temp}°</dd>
                      <dt>Wind:</dt>
                      <dd>${wind}MPH</dd>
                      <dt>Humidity:</dt>
                      <dd>${humidity}%</dd>
                    </dl>
                  </div>
                  </div>`;
        newCard.innerHTML = content;
        cardHolder.appendChild(newCard);
      }
      for (day in data.daily) {
        var dateObject = new Date(data.daily[day].dt * 1000);
        console.log("Date: " + dateObject.toString()); //data.daily[day]
        console.log("UV Index: " + data.daily[day].uvi);
        console.log("Temperature: " + data.daily[day].temp.day);
      }
    });
}
function handleSuccessfulLocationFetch(data) {
  console.log("The data for success: " + data[0].name);
  var savedLocations = localStorage.getItem("locations");
  if (savedLocations) {
    var savedLocations = JSON.parse(savedLocations);
    var newCity = data[0].name;
    savedLocations.push(newCity);
    var stringLocs = JSON.stringify(savedLocations);
    localStorage.setItem("locations", stringLocs);
    console.log("Saved Locations: " + savedLocations);
    console.log("String Locations: " + stringLocs);
  } else {
    savedLocations = [];
    savedLocations.push(data[0].name);
    localStorage.setItem("locations", JSON.stringify(savedLocations));
  }
}
var historyEl = document.getElementById("history");
console.log(historyEl);

function displaySavedLocations() {
  var locations = localStorage.getItem("locations");
  if (locations) {
    var parsedLocations = JSON.parse(locations);
    parsedLocations.forEach(function (item) {
      var listItem = document.createElement("li");
      var content = `<button class='historyButton btn' data-location='${item}'>${item}</button>`;
      listItem.innerHTML = content;
      historyEl.append(listItem);
      // Could use JQuery - Could use createElement
      // <li><button class="historyButton btn" data-location="Austin">Austin</button></li>
    });
  } else {
    return;
  }
}
function updateContentPane(evt) {
  buttonClicked = evt.target;
  var location = buttonClicked.getAttribute("data-location");
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
  searchButtonEl.addEventListener("touchstart", getLocation);
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
