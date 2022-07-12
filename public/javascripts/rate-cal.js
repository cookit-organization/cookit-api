const mongoose = require('mongoose')
const Recipe = require('../schemes/recipe')

//returns the average_rate (remember to add 1 to rates_number)
function addVote(average_rate, rate, rates_number) {   
    return (average_rate * rates_number + rate) / (rates_number + 1);
}

module.exports = {
    addVote
}
