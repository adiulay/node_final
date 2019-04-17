const request = require('request');
const axios = require('axios');

var getWeather = async (city) => {
    try{
        return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=vietnam&appid=065f068a89a7ea8deb84b3dca2160268`)
    }
}