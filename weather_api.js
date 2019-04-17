// const request = require('request');
const axios = require('axios');

var getWeather = async (formal_address, lat, lng) => {
    try {
        // const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=065f068a89a7ea8deb84b3dca2160268`);

        const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&units=metric&appid=065f068a89a7ea8deb84b3dca2160268`);

        // var city_name = weather.data.name;
        var wind = weather.data.wind.speed;
        var description = weather.data.weather[0].description;
        var temp = weather.data.main.temp;
        // console.log(weather.data.main.temp);

        return `${formal_address} has wind speed of ${wind} and ${temp} degrees celsius with ${description}`
    } catch (err) {
        if (err.response.data.cod === '400') {
            return 'Please Input a valid city'
        } else if (err.response.data.cod === '404') {
            return `City ${city} is not found in the database`
        } else {
            console.log(err.response)
        }
    }
};

var getLocation = async (address) => {
    try {
        const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyA21M21FIYH_tMjrKgDhvhGt8pLL8Bj8wQ`);

        if (location.data.status === 'ZERO_RESULTS') {
            return `Sorry, there is not such place called: ${address}`
        } else {
            var formatted_address = location.data.results[0].formatted_address;
            var lat = location.data.results[0].geometry.location.lat;
            var lng = location.data.results[0].geometry.location.lng;

            return getWeather(formatted_address, lat, lng)
        }
    } catch (err) {
        if (err.response.status === 400){
            return 'Please input valid entry'
        } else {
            console.log(err.response)
        }
    }

    // console.log(location.data.results[0])
};

module.exports = {
    getWeather: getWeather,
    getCoordinates: getLocation
};