// const request = require('request');
const axios = require('axios');

var getWeather = async (city) => {
    // try {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=065f068a89a7ea8deb84b3dca2160268`);

    var city_name = weather.data.name;
    var wind = weather.data.wind.speed;
    var description = weather.data.weather[0].description;

    return `${city_name} has wind speed of ${wind} with ${description}`
    // } catch (err) {
    //     return err;
    // }

};

module.exports = {
    getWeather: getWeather
};