/**
 * Created by timmy on 23/03/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');



mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express();



app.use(bodyparser.urlencoded({
    extended : true

}));

app.use(passport.initialize());



var router = express.Router();

router.route('/beer')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beer/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);


router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers)



app.use('/api', router);

app.listen(3000);




