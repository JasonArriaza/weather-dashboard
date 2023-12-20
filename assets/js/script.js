var apiKey = '';
var listOfCities = '';
//function to grab the input from the search bar
function getSearchInput() {
    var searchInput = document.getElementById('cityInput');
    userInput = searchInput.value;
    console.log('User Input', userInput);
    searchCity(userInput);
}
//function to find city and use its lat and long to find weather info
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
            extractLatLong(listOfCities);
            return listOfCities;
        }
    })
}

//function to extract the lat and lon from the fist city in the array
function extractLatLong() {
    console.log(listOfCities[0]);
}



 //function to use lat and long find weather info
// function cityWeather() {
// }



var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click',getSearchInput);