var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&appid=13262dbca390ca4dac33875e934250c9"


fetch(apiUrl).then(function(response) {
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