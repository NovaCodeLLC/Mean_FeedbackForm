var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        role: req.body.role
    });

    user.save(function (err, result) {
        if(err) {
            return res.status(500).json({
                title: 'An error occurred',
                obj: err
            });
        }
            res.status(201).json({
                title: "User created!",
                obj: result
            });
    });
});

router.post('/signin', function (req, res, next) {
   User.findOne({email: req.body.email}, function (error, user) {
        if(error){
            return res.status(500).json({
                title: 'An error ocurred!',
                error: error
            });
        }
        if(!user){
            return res.status(401).json({
                title: 'Login Failure',
                error: {message: 'Invalid Credentials'}
            });
        }

        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login Failure',
                error: {message: 'Invalid Credentials'}
            });
        }
       var token = jwt.sign({user: user}, 'yFx83Djs89HD5uX0r', {expiresIn: 5400});
        res.status(200).json({
            message: 'Login Successful',
            token: token,
            userId: user._id
        })
   });
});

module.exports = router;