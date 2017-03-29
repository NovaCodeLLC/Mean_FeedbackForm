/**
 * Created by Thomas Lesperance on 3/28/2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/droplist/', function (req, res, err) {
    User.find({role:'Director'}, function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                obj: err
            })
        } //end error

        if(!result){
            return res.status(500).json({
                title: 'No Directors Found',
                obj: result
            });
        }//end of null user
        return res.status(200).json({
           title: 'Success!',
            obj: result
        });
    }); //end find method
});

module.exports = router;