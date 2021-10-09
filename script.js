var searchBtn = $(".SearchBtn");

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
    
  }
})

fetch(apiKey).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        // pass response data to dom function
        console.log(data)
      });
    } 
    else {
      alert("There was a problem with your request!");
    }
  });