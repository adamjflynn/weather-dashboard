
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


//API KEY
var apiKey = "13262dbca390ca4dac33875e934250c9"

// display current weather
function displayWeather(event){
  event.preventDefault();
  if(searchCity.val().trim()!==""){
    city==searchCity.val().trim();
    currentWeather(city);
  }
}

//AJAX Call
function currentWeather(city){
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
  $.ajax({
    url:queryURL,
    method:"GET",
  }).then(function(response){
    console.log(response);

    var weathericon = response.weather[0].icon;
    var iconurl="https://openweathermap.org/img/wn/" +weathericon + "@2x.png";
    
    var date=new Date(response.dt*1000).toLocaleDateString();

    $(currentCity).html(response.name + "("+date+")" + "<img src="+iconurl+">");

     var tempF = (repsonse.main.temp - 273.15) * 1.80 + 32;
     $(currentTemp).html((tempF).toFixed(2)+"&#8457");

     $(currentHumidity).html(response.main.humidity+"%");

     var ws=response.wind.speed;
     var windsmph=(ws*2.237)(windsmph+"MPH");

     currentUVindex(repsonse.coord.lon,response.coorde.lat);
     forecast(response.id);
     if(response.cod==200){
       sCity=JSON.parse(localstorage.getItem("cityname"));
       console.log(sCity);
       if (sCity==null){
           sCity=[];
           sCity.push(city.toUpperCase()
           );
           localStorage.setItem("cityname",JSON.stringify(sCity));
           addToList(city);
       }
       else {
         if(find(city)>0){
           sCity.push(city.toUpperCase());
           localStorage.setItem("cityname",JSON.stringify(sCity));
           addToList(city);
         }
       }
     }

  });
}

function UVIndex(ln,lt){
  var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lt+"&lon="+ln;
  $.ajax({
    url:uvqURL,
    method:"GET"
  }).then(function(response){
    $(currentUVindex).html(response.value);
  });
}

function forecast(cityid){
  var dayover = false;
  var queryforecastURL="https://api.openweathermap.org/data/forecast?id="+cityid+"&appid="+apiKey;
  $.ajax({
    url:queryforecastURL,
    method:"GET"
  }).then(function(response){

      for (i=0;i<5;i++){
        var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
        var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png;
        var tempK= response.list[((i+1)*8)-1].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
        var humidity= response.list[((i+1)*8)-1].main.humidity;

        $("#fDate"+i).html(date);
        $("#fImg"=i).html("<img src="+iconurl+">");
        $("#fTemp"+i).html(tempF+"&#8457");
        $("#fHumidity"+i).html(humidity="%");
      }
  });

}

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