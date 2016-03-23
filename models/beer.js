/**
 * Created by timmy on 23/03/2016.
 */
var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({

    name : String,
    type : String,
    quantity : Number


});

module.exports = mongoose.model('Beer', BeerSchema);


