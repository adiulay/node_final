const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const axios = require('axios');
const _ = require('lodash');
const port = process.env.PORT || 8080;
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

const weather = require('./weather_api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    var output = '';
    response.render('index.hbs', {
        output: output
    })
});

app.post('/getweather', async (request, response) => {
    var city = request.body.city;
    // console.log(city);
    // var weather_description = await weather.getWeather(city);
    var weather_description = await weather.getCoordinates(city);
    response.render('index.hbs', {
        output: weather_description
    })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});