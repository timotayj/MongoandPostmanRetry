/**
 * Created by timmy on 23/03/2016.
 */
var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({

    name : String,
    type : String,
    quantity : Number,
    userId: String


});

module.exports = mongoose.model('Beer', BeerSchema);


