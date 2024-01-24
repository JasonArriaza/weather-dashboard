var apiKey = 'a2000ba3cceed20cb5cc94de29283744';
var listOfCities = [];
var searchedCity = '';

// Function to grab the input from the search bar
function getSearchInput() {
    var searchInput = document.getElementById('cityInput');
    userInput = searchInput.value;
    console.log('User Input', userInput);
    searchCity(userInput);
}

//funtion to be able to click on item in search history and run the search again



// Function to search for the cities with the given name
function searchCity() {
    console.log('Search city function is receiving the value')
    var apiUrlCityInfo = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput},&limit=5&appid=${apiKey}`;

    fetch(apiUrlCityInfo)
        .then(response => {
            if (!response.ok) {
                console.log('Unable to get city data');
            } else {
                return response.json();
            }
        })
        .then(cityData => {
            listOfCities = cityData;
            console.log('Here is the list of cities:', listOfCities);
            extractFirstCity();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to extract the first city in the array
function extractFirstCity() {
    if (listOfCities.length > 0) {
        console.log('First city:', listOfCities[0]);
        var searchedCity = listOfCities[0];
        extractLatLong(searchedCity);
        saveToSearchHistory(searchedCity);
        return searchedCity;
    } else {
        console.log('No cities found');
    }
}

// Function to extract the lat and lon in the chosen city
function extractLatLong(searchedCity) {
    if (searchedCity) {
        console.log('Lat:', searchedCity.lat);
        console.log('Lon:', searchedCity.lon);
        var cityLat = searchedCity.lat;
        var cityLon = searchedCity.lon;
        cityWeather(cityLat, cityLon);
    }
}

// Function to find weather of the lat and lon
function cityWeather(cityLat, cityLon) {
    var apiUrlWeatherInfo = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`;
    fetch(apiUrlWeatherInfo)
        .then(response => {
            if (!response.ok) {
                console.log('Unable to get city weather');
            } else {
                return response.json();
            }
        })
        .then(cityCurrentWeather => {
            console.log('Here is the city weather:', cityCurrentWeather);
            grabTemp(cityCurrentWeather);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to grab the temp of the chosen city
function grabTemp(cityCurrentWeather) {
    console.log('City Weather Data:', cityCurrentWeather);

    var cityNameElement = document.getElementById('cityName');
    var tempElement = document.getElementById('temp');
    var humidityElement = document.getElementById('humidity');
    var windElement = document.getElementById('wind');

    if (cityCurrentWeather && cityCurrentWeather.city && cityCurrentWeather.list && cityCurrentWeather.list.length > 0) {
        var cityName = cityCurrentWeather.city.name;

        // Set city name
        if (cityName) {
            cityNameElement.innerText = 'City: ' + cityName;
        } else {
            cityNameElement.innerText = 'City Name not available';
        }

        // Assuming you want the data for the first entry in the list
        var weatherData = cityCurrentWeather.list[0];

        // Temperature
        var temp = weatherData.main.temp;
        if (temp !== undefined) {
            tempElement.innerText = 'Temp: ' + temp + '°C'; // Assuming temperature is in Celsius
        } else {
            tempElement.innerText = 'Temperature data not available';
        }

        // Humidity
        var humidity = weatherData.main.humidity;
        if (humidity !== undefined) {
            humidityElement.innerText = 'Humidity: ' + humidity + '%';
        } else {
            humidityElement.innerText = 'Humidity data not available';
        }

        // Wind Speed
        var windSpeed = weatherData.wind.speed;
        if (windSpeed !== undefined) {
            windElement.innerText = 'Wind Speed: ' + windSpeed + ' m/s'; // Assuming wind speed is in meters per second
        } else {
            windElement.innerText = 'Wind Speed data not available';
        }
    } else {
        console.log('Weather data not available');
    }
}

//function to store search history into html
function saveToSearchHistory(searchedCity){
    if(searchedCity){
          // Create a new <p> element
    var newCityParagraph = document.createElement('p');
    
    newCityParagraph.textContent = userInput;

    searchHistory.appendChild(newCityParagraph);
    }
}


// Function to convert temp into f

var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getSearchInput);
