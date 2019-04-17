const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const axios = require('axios');
const _ = require('lodash');
const port = process.env.PORT || 8080;
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

// const weather = require('./weather_api.js');
const gallery = require('./gallery_api.js');
const deck = require('./deck_api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// app.get('/', (request, response) => {
//     response.render('gallery.hbs', {
//         title: 'Gallery',
//         output: 'http://t0.gstatic.com/images?q=tbn:ANd9GcQ9u48pu-6IB2FnnYl_H-15le_g8Dkt5d5RN-VWiWIl_-dyJdaa'
//     })
// });

// app.get('/gallery', async (request, response) => {
//     response.render('gallery.hbs', {
//         title: 'Gallery',
//         output: ''
//     })
// });

// app.post('/getpicture', async (request, response) => {
//     var nasa = request.body.nasa;
//     var gallery_list = await gallery.search(nasa);
//
//     if (gallery_list.length === 0 || gallery_list === 'Cannot find picture') {
//         error_dictionary = {
//             title: 'Gallery',
//             output_error: 'No pictures found'
//         };
//         response.render('gallery.hbs', error_dictionary)
//     } else {
//         response.render('gallery.hbs', {
//             title: 'Gallery',
//             output: gallery_list[_.random(0, gallery_list.length)],
//             output1: gallery_list[_.random(0, gallery_list.length)],
//             output2: gallery_list[_.random(0, gallery_list.length)],
//             output3: gallery_list[_.random(0, gallery_list.length)]
//         })
//     }
// });

app.get('/', (request, response) => {
    response.render('deck.hbs', {
        title: 'DRAW YUGIOH',
        output: 'hello'
    })
});

app.post('/drawcard', async (request, response) => {
    var card_drawn = request.body.card_drawn;

    var api_deck = await deck.drawCard(card_drawn);

    var hand = [];

    var i;
    for (i = 0; i < api_deck.length; i++) {
        hand.push(api_deck[i].image)
    }

    response.render('deck.hbs', {
        title: 'DRAW YUGIOH',
        output: 'Here is your output',
        draw_card: hand
    })
});


// app.post('/getweather', async (request, response) => {
//     var city = request.body.city;
//     // console.log(city);
//     // var weather_description = await weather.getWeather(city);
//     var weather_description = await weather.getCoordinates(city);
//     response.render('index.hbs', {
//         output: weather_description
//     })
// });

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});