var apiKey = 'a2000ba3cceed20cb5cc94de29283744';
var listOfCities = [];
var searchedCity = '';


function getCurrentDate() {
    var currentDate = new Date();
    
    // Months array for formatting
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get the components of the date
    var month = months[currentDate.getMonth()];
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();

    // Format the date
    var formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}


var currentDateElement = document.getElementById('currentDateElement');
currentDateElement.innerText = getCurrentDate();


// Function to grab the input from the search bar
function getSearchInput() {
    var searchInput = document.getElementById('cityInput');
    userInput = searchInput.value;
    console.log('User Input', userInput);
    searchCity(userInput);
}



// Function to search for the cities with the given name
function searchCity(userInput) {
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
    var apiUrlWeatherInfo = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&cnt=200&appid=${apiKey}&units=imperial`;
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

    var tempElementOne = document.getElementById('temp1');
    var humidityElementOne = document.getElementById('humidity1');
    var windElementOne = document.getElementById('wind1');

    var tempElementTwo = document.getElementById('temp2');
    var humidityElementTwo = document.getElementById('humidity2');
    var windElementTwo = document.getElementById('wind2');

    var tempElementThree = document.getElementById('temp3');
    var humidityElementThree = document.getElementById('humidity3');
    var windElementThree = document.getElementById('wind3');

    var tempElementFour = document.getElementById('temp4');
    var humidityElementFour = document.getElementById('humidity4');
    var windElementFour = document.getElementById('wind4');

    var tempElementFive = document.getElementById('temp5');
    var humidityElementFive = document.getElementById('humidity5');
    var windElementFive = document.getElementById('wind5');

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
        var weatherDataOne = cityCurrentWeather.list[8];
        var weatherDataTwo = cityCurrentWeather.list[16];
        var weatherDataThree = cityCurrentWeather.list[24];
        var weatherDataFour = cityCurrentWeather.list[32];
        var weatherDataFive = cityCurrentWeather.list[39];






        // Temperature
        var temp = weatherData.main.temp;
        var temp1 = weatherDataOne.main.temp;
        var temp2 = weatherDataTwo.main.temp;
        var temp3 = weatherDataThree.main.temp;
        var temp4 = weatherDataFour.main.temp;
        var temp5 = weatherDataFive.main.temp;

        if (temp !== undefined) {
            tempElement.innerText = 'Temp: ' + temp + '°F';
            tempElementOne.innerText = 'Temp: ' + temp1 + '°F';
            tempElementTwo.innerText = 'Temp: ' + temp2 + '°F';
            tempElementThree.innerText = 'Temp: ' + temp3 + '°F';
            tempElementFour.innerText = 'Temp: ' + temp4 + '°F';
            tempElementFive.innerText = 'Temp: ' + temp5 + '°F';
        } else {
            tempElement.innerText = 'Temperature data not available';
        }







        // Humidity
        var humidity = weatherData.main.humidity;
        var humidity1 = weatherDataOne.main.humidity;
        var humidity2 = weatherDataTwo.main.humidity;
        var humidity3 = weatherDataThree.main.humidity;
        var humidity4 = weatherDataFour.main.humidity;
        var humidity5 = weatherDataFive.main.humidity;

        if (humidity !== undefined) {
            humidityElement.innerText = 'Humidity: ' + humidity + '%';

            humidityElementOne.innerText = 'Humidity: ' + humidity1 + '%';
            humidityElementTwo.innerText = 'Humidity: ' + humidity2 + '%';
            humidityElementThree.innerText = 'Humidity: ' + humidity3 + '%';
            humidityElementFour.innerText = 'Humidity: ' + humidity4 + '%';
            humidityElementFive.innerText = 'Humidity: ' + humidity5 + '%';

        } else {
            humidityElement.innerText = 'Humidity data not available';
        }






        // Wind Speed
        var windSpeed = weatherData.wind.speed;
        var windSpeedOne = weatherDataOne.wind.speed;
        var windSpeedTwo = weatherDataTwo.wind.speed;
        var windSpeedThree = weatherDataThree.wind.speed;
        var windSpeedFour = weatherDataFour.wind.speed;
        var windSpeedFive = weatherDataFive.wind.speed;
        if (windSpeed !== undefined) {
            windElement.innerText = 'Wind Speed: ' + windSpeed + ' m/s';
            windElementOne.innerText = 'Wind Speed: ' + windSpeedOne + ' m/s';
            windElementTwo.innerText = 'Wind Speed: ' + windSpeedTwo + ' m/s';
            windElementThree.innerText = 'Wind Speed: ' + windSpeedThree + ' m/s';
            windElementFour.innerText = 'Wind Speed: ' + windSpeedFour + ' m/s';
            windElementFive.innerText = 'Wind Speed: ' + windSpeedFive + ' m/s';

        } else {
            windElement.innerText = 'Wind Speed data not available';
        }
    } else {
        console.log('Weather data not available');
    }
}

//function to store search history into html
function saveToSearchHistory(searchedCity) {
    if (searchedCity) {
        // Create a new <p> element
        var newCityParagraph = document.createElement('p');

        newCityParagraph.textContent = userInput;

        newCityParagraph.classList.add('search-history-item');

        newCityParagraph.addEventListener('click', clickableSearchHistory);

        searchHistory.appendChild(newCityParagraph);

    }
}

// Function to add clickable seartch history
function clickableSearchHistory(event) {
    let userInput = event.target.textContent;
    console.log('Clicked text:', userInput);
    searchCity(userInput);
}
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getSearchInput);

// Event listener for dynamically created elements
document.addEventListener('click', function (event) {
    if (event.target.tagName === 'p' && event.target.parentElement.classList.contains('search-history-item')) {
        event.preventDefault();

        clickableSearchHistory(event);
    }
});
