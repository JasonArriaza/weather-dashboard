var apiKey = 'a2000ba3cceed20cb5cc94de29283744';
var listOfCities = '';
var searchedCity = '';
//function to grab the input from the search bar
function getSearchInput() {
    var searchInput = document.getElementById('cityInput');
    userInput = searchInput.value;
    console.log('User Input', userInput);
    searchCity(userInput);
}
//function to search fot the cities with the given name
function searchCity() {
    console.log('Search city funciton is receiving the value')
    var apiUrlCityInfo = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput},&limit=5&appid=${apiKey}`;

    fetch(apiUrlCityInfo)
    .then(response => {
        if (!response.ok) {
            console.log('Unable to get city data')
        } else if (response.ok) {
            var listOfCities = response.json();
            console.log('Here is the list of cities:', listOfCities);
            return listOfCities;

        }
    })
    .then(cityData => {
        listOfCities = cityData;
        console.log('Here is the list of cities:', listOfCities);
        extractFirstCity();
    })
    }

//function to extract the first city in the array
function extractFirstCity() {
    if (listOfCities.length > 0) {
        console.log('First city:', listOfCities[0]);
        var searchedCity = listOfCities[0];
        extractLatLong(searchedCity);
        return searchedCity;
    } else {
        console.log('No cities found');
    }
}
 //function to extract the lat and lon in the chosen city
 function extractLatLong(searchedCity){
    if(searchedCity){
        if(searchedCity){
            console.log('Lat:', searchedCity.lat);
            console.log('Lon:', searchedCity.lon);
            var cityLat = searchedCity.lat;
            var cityLon = searchedCity.lon;
            cityWeather(cityLat,cityLon);
            return cityLat, cityLon;
        }
    }
 }
 //funtion to find weather of the lat and lon
function cityWeather(cityLat, cityLon) {
    var apiUrlWeatherInfo = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`;
    fetch(apiUrlWeatherInfo)
    .then(response => {
        if (!response.ok) {
            console.log('Unable to get city weather')
        } else if (response.ok) {
            var cityWeather = response.json();
            console.log('Here is the city weather:', cityWeather);
            return cityWeather;

}})
}

//funtion to grab the temp of the chosen city

//funtion to convert temp into f

//fucntion to grab the windspeed of chosen city

//fucntion to grab the humidity of the chosen city



var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click',getSearchInput);