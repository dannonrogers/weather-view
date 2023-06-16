var APIKey = "db31bf6108b187762588dba613d33469";
var searchFormEl = document.getElementById('search-form');
var forecastSection = document.querySelector('.forecast-section');
var currentContainerEl = document.querySelector('#current-container');
var currentHeader = document.querySelector('.current-header');
var currentIconImg = currentContainerEl.querySelector('img');
var currentReading = currentContainerEl.querySelectorAll('p');
var fiveDayHeader = document.querySelector('.five-day-header');
var futureForecastCard = document.querySelector('.card');
var futureHeader = document.querySelector('.future-header');
var fiveDayIconImg = futureForecastCard.querySelector('img');
var fiveDayReading = futureForecastCard.querySelectorAll('p');
var today = new Date();
var currentDate = today.toLocaleDateString();

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var city = document.getElementById('search-input').value;
    var encodedCity = encodeURIComponent(city);
    
    if (!city) {
        console.error('You need a city name!');
        return;
    }
    
    currentForecast(encodedCity);
    fiveDayForecast(encodedCity);
};

function currentForecast(encodedCity) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodedCity + '&appid=' + APIKey + '&units=imperial';
    
    fetch(currentQueryUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        
        return response.json();
    })
    .then(function (currentRes) {
        currentContainerEl.classList.add('current-forecast');
        var iconCode = currentRes.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        
        currentReading[0].textContent = "Temp: " + currentRes.main.temp + "°F";
        currentReading[1].textContent = "Wind: " + currentRes.wind.speed + "MPH";
        currentReading[2].textContent = "Humidity: " + currentRes.main.humidity + "%";
        
        currentHeader.textContent = currentRes.name + " (" + currentDate + ")";
        
        currentIconImg.classList.add('icon-image');
        currentIconImg.src = iconUrl;
        
    })
};

function fiveDayForecast(encodedCity) {
    var fiveDayQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + encodedCity + '&appid=' + APIKey + '&units=imperial';
    
    fetch(fiveDayQueryUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        
        return response.json();
    })
    .then(function (fiveDayRes) {
        var futureForecastArray = fiveDayRes.list;
        var futureForecast = [];
        
        for (var i = 7; i <= futureForecastArray.length; i+=8) {
            futureForecast.push(futureForecastArray[i]);
        }

        fiveDayHeader.textContent = '5-Day Forecast:';

        var cardElements = document.querySelectorAll('.card');
        cardElements.forEach(function (card, index) {
            var futureForecastData = futureForecast[index];
            var dateString = new Date(futureForecastData.dt_txt).toLocaleDateString();
            var iconCode = futureForecastData.weather[0].icon;
            var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '.png';

            card.classList.add('future-forecast-card');

            var cardHeader = card.querySelector('.future-header');
            var cardIconImg = card.querySelector('img');
            var cardReading = card.querySelectorAll('p');

            cardHeader.textContent = dateString;
            cardIconImg.src = iconUrl;
            cardReading[0].textContent = 'Temp: ' + futureForecastData.main.temp + '°F';
            cardReading[1].textContent = 'Wind: ' + futureForecastData.wind.speed + 'MPH';
            cardReading[2].textContent = 'Humidity: ' + futureForecastData.main.humidity + '%';
        });
    });
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);