
// variables
var serahCity = $("#search-city");
var searchBtn = $("#SearchBtn");
var clearBtn = $("#clearBtn");
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");
var currentUVindex = $("#uv-index");
var sCity=[];

// search city
function find(c){
  for (var i=0; i<sCity.length; i++){
    if(c.toUpperCase()===sCity[i]){
      return -1;
    }
  }
  return 1;
}

var apiKey = "13262dbca390ca4dac33875e934250c9"

// click event for search button

searchBtn.click(function() {

  var searchInput = $(".searchInput").val();

  //current weather variable
  var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

  // 5 day forecast variable

  var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


if (searchInput == "") {
  console.log(searchInput);
} else {
  $.ajax({
    url: urlCurrent,
    method: "GET"
  }).then(function (response) {
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + response.name + "</li>");

  })