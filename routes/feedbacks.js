/**
 * Created by TXL8009 on 3/13/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Feedback = require('../models/feedback');

router.get('/', function (req, res, next) {
    Feedback.find()
        .exec(function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    title:'An error occurred',
                    error:err
                });
            }
            res.status(200).json({
                message:'Success',
                obj:feedback
            });
        });
});

router.post('/', function (req, res, next) {
    var feedback = new Feedback({
        nameBox: req.body.nameBox,
        productBox: req.body.productBox,
        upsBox: req.body.upsBox,
        downsBox: req.body.downsBox
    });
    feedback.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved feedback',
            obj: result
        });
    });
});

router.patch('/', function (req, res, next) {
    //create an array from the objects in the body
    var data = req.body;
    console.log(req.body);
    //this array holds all the database response objects
    var responseArray = [];

        //iterate over each item in the array
        var iteration = [];

            iteration.push(data.every(function (feedbackIn) {

            //take current object and transform to feedback object
            var feedBack = new Feedback({
            nameBox: feedbackIn.nameBox,
            productBox: feedbackIn.productBox,
            upsBox: feedbackIn.upsBox,
            downsBox: feedbackIn.downsBox
        });

        //grab the current object's id
        var idString = feedbackIn.feedbackID;
        var objectID = new mongoose.mongo.ObjectId(idString);
        var query = {_id: objectID};

        //find the ID and attempt to store to DB
        var results = Feedback.findOneAndUpdate(query,
                                                {$set:{upsBox: feedBack.upsBox,
                                                        downsBox: feedBack.downsBox}},
                                                function (err, dbRes) {
            console.log("in findby");
            if (err) {
                responseArray.push(JSON.stringify({
                    title: 'An error occurred',
                    error: err
                }));
                console.log(responseArray);
                return false;
            }
            if (!dbRes) {
                responseArray.push(JSON.stringify({
                    title: 'No Feedback Record Found!',
                    error: {feedback: 'Feedback Record not found'}
                }));
                console.log(responseArray);
                return false;
            }
                console.log("in Save! pass");
                responseArray.push({
                    message: 'Updated message',
                    obj: dbRes
                });
                console.log("holding array content: " + responseArray);
                return true;
            });
        return results;
    }));
        if(iteration.includes(false)){
            console.log("in iteration failure");
            res.status(500).json({
                message: 'update failed',
                obj: JSON.stringify(responseArray)
            });
        } else if(iteration.includes(true)) {
            console.log("interation success");
            res.status(200).json({
                message: "Update Success!",
                obj: JSON.stringify(responseArray)
            });
        }
});

router.delete('/', function(req, res, next) {
    Feedback.find()
        .exec(function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;