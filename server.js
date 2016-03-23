/**
 * Created by timmy on 23/03/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var Beer = require('./models/beer');

var app = express();

app.use(bodyparser.urlencoded({
    extended : true

}));





var port = process.env.PORT || 3000;

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/beerlocker');







router.get('/', function (req, res) {
    res.json({message: 'running low!'});

});

var beerRoute = router.route('/beer');

beerRoute.post(function (req,res) {

    var beer = new Beer();
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    beer.save(function(err){

        if(err)
            res.send(err);
        res.json({message: 'beer added', data:beer});
    });




});


beerRoute.get(function (req, res) {
    Beer.find(function (err,beer) {
        if(err)
            res.send(err);
        res.json(beer);

    });
});


var beerRoute = router.route('/beer/:beer_id');
beerRoute.get(function (req,res) {
    Beer.findById(req.params.beer_id,function (err,beer) {
        if (err)
            res.send(err);
        res.json(beer);
    });
});

beerRoute.put(function (req,res) {

    Beer.findById(req.params.beer_id,function (err, beer) {
        if(err)
            res.send(err);
        beer.quantity = req.body.quantity;


        beer.save(function (err) {
            if(err)
                res.send(err);
            res.json(beer);

        });

    });

});


beerRoute.delete(function(req,res){
    Beer.findByIdAndRemove(req.params.beer_id,function (err) {
        if (err)
            res.send(err);

        res.json({message: 'beer removed'});

    });


});




app.use('/api', router);

app.listen(port);
console.log('Insert beer or port' + port);



