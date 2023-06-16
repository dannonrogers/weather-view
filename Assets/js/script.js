var APIKey = "db31bf6108b187762588dba613d33469";
var searchFormEl = document.getElementById('search-form');
var forecastSection = document.querySelector('.forecast-section');
var currentHeader = document.querySelector('.current-header');
var today = new Date();
var currentDate = today.toLocaleDateString();

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var city = document.getElementById('search-input').value;
    var encodedCity = encodeURIComponent(city);
    console.log(city);
    
    if (!city) {
        console.error('You need a city name!');
        return;
    }
    
    searchApi(encodedCity);
};

function searchApi(encodedCity) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodedCity + '&appid=' + APIKey + '&units=imperial';
    var fiveDayQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + encodedCity + '&appid=' + APIKey + '&units=imperial';
    
    fetch(currentQueryUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        
        return response.json();
    })
    .then(function (currentRes) {
        var iconCode = currentRes.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        var iconImg = document.querySelector(".icon-image");
        iconImg.src = iconUrl;
        currentHeader.textContent = currentRes.name + " (" + currentDate + ")";
      })
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);