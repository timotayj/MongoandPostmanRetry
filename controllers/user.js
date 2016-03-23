/**
 * Created by timmy on 23/03/2016.
 */


var User = require('../models/user')

exports.postUsers = function (req,res) {
    var user = new User({

        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err){
        if (err)
            res.send(err);
        res.json({message: 'new user added'});
    });

};



exports.getUsers = function (req,res) {

    User.find(function (err, user) {
        if (err)
            res.send(err);

        res.json(user);

    });

};