const axios = require('axios/index');
const fs = require('fs');



var drawCard = async (number_of_cards) => {
    const shuffle_deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    var deck_id =  shuffle_deck.data.deck_id;

    const draw_card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${number_of_cards}`);

    return draw_card.data.cards
};




module.exports = {
    drawCard: drawCard
};