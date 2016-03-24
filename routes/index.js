/**
 * Created by timmy on 23/03/2016.
 */
var express = require('express');
var router = express.Router();
var beerController = require('../controllers/beer');
var Beer = require('../models/beer');





/* GET home page. */
router.get('/', function(req, res, next) {
    Beer.find({}, function (err, docs) {
        res.render('index', {docs:docs });
    })


   
});






module.exports = router;


