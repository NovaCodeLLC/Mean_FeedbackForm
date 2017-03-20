/**
 * Created by TXL8009 on 3/13/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Rx = require('rxjs/Rx');


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


     Rx.Observable.from(data)
        .map(function (dataJson) {

            var feedback = new Feedback({
                nameBox: dataJson.nameBox,
                productBox: dataJson.productBox,
                upsBox: dataJson.upsBox,
                downsBox: dataJson.downsBox
            });

            var objectID = new mongoose.mongo.ObjectId(dataJson.feedbackID);

            var composite = new Object({
                feedbackDat: feedback,
                finder: {_id: objectID}
            });

            return composite;
        })
         .do(
             function(composite){
                 Feedback.findOneAndUpdate(composite.finder,
                     {
                         $set: {
                             upsBox: composite.feedback.upsBox,
                             downsBox: composite.feedback.downsBox
                         }
                     }, function(dbRes, error) {
                        console.log("in the update")
                        if(error) {
                            return JSON.stringify({
                                title: 'No Feedback Record Found!',
                                error: {feedback: 'Feedback Record not found'}
                            })
                        }
                            return JSON.stringify({
                                title: 'Updated message',
                                obj: dbRes
                            });
                        });
             })
        .subscribe(
           function(next) { console.log(next);},

           function(dbRes){
               if (!dbRes) {
                return JSON.stringify({
                    title: 'No Feedback Record Found!',
                    error: {feedback: 'Feedback Record not found'}
                });
            }

            return JSON.stringify({
                title: 'Updated message',
                obj: dbRes
            });
            },

            function(err){
               if(err){
                    return JSON.stringify({
                        title: 'An error occurred',
                        error: err
                    })
                }
            },

            function(){console.log("Complete!");}
        );
});


    //     //iterate over each item in the array
    //     var iteration = [];
    //
    //         iteration.push(data.every(function (feedbackIn) {
    //
    //         //take current object and transform to feedback object
    //         var feedBack = new Feedback({
    //         nameBox: feedbackIn.nameBox,
    //         productBox: feedbackIn.productBox,
    //         upsBox: feedbackIn.upsBox,
    //         downsBox: feedbackIn.downsBox
    //     });
    //
    //     //grab the current object's id
    //
    //     var objectID = new mongoose.mongo.ObjectId(feedbackIn.feedbackID);
    //     var query = {_id: objectID};
    //     var result;
    //
    //     //find the ID and attempt to store to DB
    //     result =  Feedback.findOneAndUpdate(query,
    //                                             {$set:{upsBox: feedBack.upsBox,
    //                                                     downsBox: feedBack.downsBox}},
    //                                             function (err, dbRes) {
    //         console.log("in findby");
    //         if (err) {
    //             responseArray.push(JSON.stringify({
    //                 title: 'An error occurred',
    //                 error: err
    //             }));
    //             console.log(responseArray);
    //             return false;
    //         }
    //         if (!dbRes) {
    //             responseArray.push(JSON.stringify({
    //                 title: 'No Feedback Record Found!',
    //                 error: {feedback: 'Feedback Record not found'}
    //             }));
    //             console.log(responseArray);
    //             return false;
    //         }
    //             console.log("in Save! pass");
    //             responseArray.push({
    //                 message: 'Updated message',
    //                 obj: dbRes
    //             });
    //             console.log("holding array content: " + responseArray);
    //             return true;
    //         });
    //     console.log("Result value: " + result);
    //     return result;
    // }));
    // console.log("iteration array: " + iteration);
    //     if(iteration.includes(false)){
    //         console.log("in iteration failure");
    //         res.status(500).json({
    //             message: 'update failed',
    //             obj: JSON.stringify(responseArray)
    //         });
    //     } else if(iteration.includes(true)) {
    //         console.log("interation success");
    //         res.status(200).json({
    //             message: "Update Success!",
    //             obj: JSON.stringify(responseArray)
    //         });
    //     }

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