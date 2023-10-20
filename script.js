// Below: the apiKey is use to retrieve data through creating an account through the weather website.
const apiKey = "d873fc9a964d259941e1ffb84bcb79c6";
// Below: default city to test before changing the variable into the text-area value.
var city = "New York City";
var timeCurrent = dayjs();
// Below: variable city was replaced. Only using New York City as the city placeholder. Whatever that is in the text area will be place in the city variable. Preparation so less time to code. ${city} allows any city to be inputted. 
var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d873fc9a964d259941e1ffb84bcb79c6`;
var presentDate;
var temperature = 0;
var humidity = 0;
var icon = "";
var windSpeed = 0;
var longitude = 0;
var latitude = 0;
var iconUrl = "";
var weatherData = "";
var searchCity = $("#search-city");
var currentWeather = $("#current-weather");
var daysForecast = "";
var numDays = 1;

// Below: on click button that allows for activation of the weatherForecast function. Needs to be done before the weatherForecast function. 
searchCity.on("click", weatherForecast);

// Below: purpose of the function is to gather for the current weather and display it onto the browser.
function weatherForecast () {
 currentWeather.children().remove();
 // Below: these two below are important to update the city search. url will also be updated.
 city = $("#text-city").val();
 url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d873fc9a964d259941e1ffb84bcb79c6`;

 // Below: get info from the API. url has parameters needs to be modify. 
 fetch(url)
 // Below: .then wait until the url is fetch then it will run the url. return response.json() allows for the data to be display on the browser.Asynchronus (look it up).
 .then(function (response) {
  return response.json();
 })
 .then(function (data) {
  console.log(data)

  presentDate = timeCurrent.format("MM/DD/YYYY");
  temperature = changeTemp(data.main.temp);
  humidity = data.main.humidity;
  icon = data.weather[0].icon;
  windSpeed = data.wind.speed;
  latitude = data.coord.lat.toFixed(2);
  longitude = data.coord.lon.toFixed(2)
  
  // Below: gets the icon from the url and display it. 
  iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

  // Below: allows the data from the url to be connected to the text below.
  weatherData = $(`<div class="col" id="data-collection">
  <div id="text-on-top">
    <h2>${city} ${presentDate} <img 
    id="weatherIcon" src=${iconUrl}
    alt="icon"></h2>
    <p>Temperature: ${temperature}&#8457;</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed}mph</p>
  </div>`)

  $("#current-weather").append(weatherData);

  fiveDaysCast(longitude, latitude);

 })

}

function fiveDaysCast (longitude, latitude) {
  getFiveDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=d873fc9a964d259941e1ffb84bcb79c6" 

  fetch(getFiveDaysUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
     numDays = 1;
     hours = 1;

     if (daysForecast === "") {
      // daysForecast = $(`<div class="container text-center">
      // <h3>Forecast for the 5 days</h3>
      // <div class="row align-items-start" id="dailyStart">`);
      daysForecast = $(`<div class="container text-center">
      <h3>Forecast for the 5 days</h3>
      <div class="row align-items-start" id="dailyStart">`);
    $("#data-collection").append(daysForecast);
      console.log("daysForecast is an empty string");
    }
  
    else {
      daysForecast.remove();
      daysForecast = $(`<div class="container text-center">
      <h3>Forecast for the 5 days</h3>
      <div class="row align-items-start" id="dailyStart">`);
      $("#data-collection").append(daysForecast);
      console.log("daysForecast is remove");
    }
  
    for (var j = 0; j < 5; j++) {
      var date = timeCurrent.add(numDays, 'day').format("MM/DD/YYYY");
      numDays++;
     
      var dayIcon = data.list[hours].weather[0].icon;
      var URLicon = "http://openweathermap.org/img/w/" + dayIcon + ".png";
     
      var dayTemp = changeTemp(data.list[hours].main.temp);
     
      var dayWindSpeed = data.list[hours].wind.speed;
     
      var dayHumidity = data.list[hours].main.humidity;
      
      tomorrowCard = $(`<div class="col">
      <h4>${date}</h4>
      <img id="icons" src="${URLicon}">
        <p>Temp: ${dayTemp}&#8457;</p>
        <p>Wind: ${dayWindSpeed} MPH</p>
        <p>Humidity: ${dayHumidity}%</p>
        </div>`);
  
      $('#dailyStart').append(tomorrowCard); 
      hours = hours + 8;
      console.log("finish appending");
    }

  })

  // if (daysForecast === "") {
  //   daysForecast = $(`<div class="container text-center">
  //   <h3>Forecast for the 5 days</h3>
  //   <div class="row align-items-start" id="dailyStart">`);

  // $("#data-collection").append(daysForecast);

  // }

  // else {
  //   daysForecast.remove();
  //   daysForecast = $(`<div class="container text-center">
  //   <h3>Forecast for the 5 days</h3>
  //   <div class="row align-items-start" id="dailyStart">`);
  // }

  // for (var j = 0; j < 5; j++) {
  //   var date = timeCurrent.add(numDays, 'day').format("MM/DD/YYYY");
  //   numDays++;
   
  //   var dayIcon = data.list[hours].weather[0].icon;
  //   var URLicon = "http://openweathermap.org/img/w/" + dayIcon + ".png";
   
  //   var dayTemp = changeTemp(data.list[hours].main.temp);
   
  //   var dayWindSpeed = data.list[hours].wind.speed;
   
  //   var dayHumidity = data.list[hours].main.humidity;
    
  //   tomorrowCard = $(`<div class="col">
  //   <h4>${date}</h4>
  //   <img id="icons" src="${URLicon}">
  //     <p>Temp: ${dayTemp}&#8457;</p>
  //     <p>Wind: ${dayWindSpeed} MPH</p>
  //     <p>Humidity: ${dayHumidity}%</p>
  //     </div>`);

  //   $('#dailyStart').append(tomorrowCard); 
  //   hours = hours + 8;

  // }

}

function changeTemp(k) {
  var degree = ((k - 273.15) * (9 / 5) + 32).toFixed(2);
  return degree; 
}

weatherDisplay = $()