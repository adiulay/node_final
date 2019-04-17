const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');

var getRandomCard = async () => {
    try {
        const card = await axios.get('https://db.ygoprodeck.com/api/v4/randomcard.php');
        return card.data[0][0].image_url
    } catch (err) {
        return err
    }
};

var getPicture = async (find_picture) => {
    try {
        const picture = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(find_picture)}`);

        try {
            var test = picture.data.collection.items[0].href;
        } catch {
            return 'Cannot find picture'
        }

        const grab_picture = await axios.get(test);

        var picture_list = [];

        var i;

        for (i = 0; i < grab_picture.data.length; i++) {
            if (grab_picture.data[i].slice(-3) === 'jpg' || grab_picture.data[i].slice(-3) === 'png') {
                picture_list.push(grab_picture.data[i])
            }
        }
        return picture_list

        // return card.data[0][0].image_url
    } catch (err) {
        return (err)
    }

};

module.exports = {
    yugioh: getRandomCard,
    search: getPicture
};