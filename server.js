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
var path = require('path');



mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express();



app.use(bodyparser.urlencoded({
    extended : true

}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




app.use(passport.initialize());



var router = express.Router();


var routes = require('./routes/index');
app.use('/', routes);


router.route('/')
    .get(beerController.getBeers)
    .put(beerController.putBeer)
    .post(beerController.postBeers);



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




